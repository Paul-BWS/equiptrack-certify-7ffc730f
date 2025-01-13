import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import { toast } from "sonner";
import { useTorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";
import { useTorqueWrenchSubmit } from "@/hooks/useTorqueWrenchSubmit";
import { validateForm } from "@/utils/torqueReadingsValidation";
import { supabase } from "@/lib/supabase";
import { ModalHeader } from "./torque-readings/modal/ModalHeader";
import { LoadingView } from "./torque-readings/modal/LoadingView";
import { ModalForm } from "./torque-readings/modal/ModalForm";

interface TorqueReadingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}

export const TorqueReadingsModal = ({
  open,
  onOpenChange,
  equipmentId,
}: TorqueReadingsModalProps) => {
  const { data: equipment, isLoading, error } = useEquipmentData(equipmentId, open);
  const { readings, setReadings } = useTorqueReadingsForm(equipment, open);
  const { handleSave, isSaving } = useTorqueWrenchSubmit(equipmentId, () => {
    toast.success("Torque wrench data saved successfully");
    onOpenChange(false);
  });

  // Generate certificate number for new entries
  if (!equipmentId && !readings.certNumber) {
    setReadings(prev => ({
      ...prev,
      certNumber: generateCertificateNumber()
    }));
  }

  if (error) {
    toast.error("Failed to load equipment data");
    return null;
  }

  if (isLoading) {
    return <LoadingView open={open} onOpenChange={onOpenChange} />;
  }

  const handleDelete = async () => {
    if (!equipmentId) return;

    try {
      const { error: certError } = await supabase
        .from('certificates')
        .delete()
        .eq('torque_wrench_id', equipmentId);

      if (certError) throw certError;

      const { error: deleteError } = await supabase
        .from('torque_wrench')
        .delete()
        .eq('id', equipmentId);

      if (deleteError) throw deleteError;

      toast.success("Torque wrench deleted successfully");
      onOpenChange(false);
    } catch (error) {
      console.error('Error deleting torque wrench:', error);
      toast.error("Failed to delete torque wrench");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(readings)) {
      return;
    }

    const pathSegments = window.location.pathname.split('/');
    const companyIdIndex = pathSegments.indexOf('customers') + 1;
    const companyId = pathSegments[companyIdIndex];

    const torqueWrenchData = {
      id: equipmentId,
      company_id: companyId,
      model: readings.model,
      serial_number: readings.serialNumber,
      min_torque: parseFloat(readings.min),
      max_torque: parseFloat(readings.max),
      units: readings.units,
      last_service_date: readings.date,
      next_service_due: readings.retestDate,
      engineer: readings.engineer,
      result: readings.result,
      notes: readings.notes,
      readings: readings.readings,
      definitive_readings: readings.definitiveReadings,
      cert_number: readings.certNumber,
      status: readings.status
    };

    try {
      await handleSave(torqueWrenchData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to save torque wrench data");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white p-0">
        <ModalHeader />
        <ModalForm
          readings={readings}
          setReadings={setReadings}
          onSubmit={handleSubmit}
          onClose={() => onOpenChange(false)}
          onDelete={handleDelete}
          isSaving={isSaving}
          equipmentId={equipmentId}
        />
      </DialogContent>
    </Dialog>
  );
};