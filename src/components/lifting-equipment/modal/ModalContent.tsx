import { DialogContent } from "@/components/ui/dialog";
import { ModalHeader } from "./ModalHeader";
import { LoadingView } from "./LoadingView";
import { ModalForm } from "./ModalForm";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import { useLiftingEquipmentForm } from "@/hooks/useLiftingEquipmentForm";
import { useLiftingEquipmentSubmit } from "@/hooks/useLiftingEquipmentSubmit";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";
import { validateLiftingEquipmentForm } from "@/utils/liftingEquipmentValidation";
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
  const { readings, setReadings } = useLiftingEquipmentForm(equipment, open);
  const { handleSave, isSaving } = useLiftingEquipmentSubmit(equipmentId, () => {
    toast.success("Lifting equipment data saved successfully");
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

  if (isLoading && equipmentId) {
    return <LoadingView open={open} onOpenChange={onOpenChange} />;
  }

  const handleDelete = async () => {
    if (!equipmentId) return;

    try {
      const { error: deleteError } = await supabase
        .from('lifting_equipment')
        .delete()
        .eq('id', equipmentId);

      if (deleteError) throw deleteError;

      toast.success("Lifting equipment deleted successfully");
      onOpenChange(false);
    } catch (error) {
      console.error('Error deleting lifting equipment:', error);
      toast.error("Failed to delete lifting equipment");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLiftingEquipmentForm(readings)) {
      return;
    }

    const pathSegments = window.location.pathname.split('/');
    const companyIdIndex = pathSegments.indexOf('customers') + 1;
    const companyId = pathSegments[companyIdIndex];

    const liftingEquipmentData = {
      company_id: companyId,
      cert_number: readings.certNumber,
      model: readings.model,
      serial_number: readings.serialNumber,
      engineer: readings.engineer,
      last_service_date: readings.date,
      next_service_due: readings.retestDate,
      test_result: readings.result,
      notes: readings.notes,
      status: readings.status,
      platform_condition: readings.platform_condition,
      control_box_condition: readings.control_box_condition,
      hydraulic_hoses_condition: readings.hydraulic_hoses_condition,
      main_structure_inspection: readings.main_structure_inspection,
      oil_levels: readings.oil_levels,
      rollers_and_guides: readings.rollers_and_guides,
      safety_mechanism: readings.safety_mechanism,
      scissor_operation: readings.scissor_operation,
      securing_bolts: readings.securing_bolts,
      toe_guards: readings.toe_guards,
      lubrication_moving_parts: readings.lubrication_moving_parts
    };

    try {
      await handleSave(liftingEquipmentData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to save lifting equipment data");
    }
  };

  return (
    <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white p-0">
      <ModalHeader />
      <ModalForm
        readings={readings}
        setReadings={setReadings}
        onSubmit={handleSubmit}
        onCancel={() => onOpenChange(false)}
        onDelete={handleDelete}
        isSaving={isSaving}
        equipmentId={equipmentId}
      />
    </DialogContent>
  );
};