import { DialogContent } from "@/components/ui/dialog";
import { ModalHeader } from "./ModalHeader";
import { LoadingView } from "./LoadingView";
import { ModalForm } from "./ModalForm";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import { useTorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";
import { useTorqueWrenchSubmit } from "@/hooks/useTorqueWrenchSubmit";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";
import { validateForm } from "@/utils/torqueReadingsValidation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface ModalContentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}

export const ModalContent = ({
  open,
  onOpenChange,
  equipmentId,
}: ModalContentProps) => {
  const { data: equipment, isLoading, error } = useEquipmentData(equipmentId, open);
  const { readings, setReadings } = useTorqueReadingsForm(equipment, open);
  const { handleSave, isSaving } = useTorqueWrenchSubmit(equipmentId, () => {
    toast.success("Torque wrench data saved successfully");
    onOpenChange(false);
  });

  console.log('Equipment data:', equipment); // Debug log
  console.log('Current readings:', readings); // Debug log

  // Generate certificate number for new entries
  if (!equipmentId && !readings.certNumber) {
    setReadings(prev => ({
      ...prev,
      certNumber: generateCertificateNumber()
    }));
  }

  if (error) {
    console.error('Error loading equipment:', error); // Debug log
    toast.error("Failed to load equipment data");
    return null;
  }

  if (isLoading && equipmentId) {
    return <LoadingView open={open} onOpenChange={onOpenChange} />;
  }

  const handleDelete = async () => {
    if (!equipmentId) return;

    try {
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
  );
};