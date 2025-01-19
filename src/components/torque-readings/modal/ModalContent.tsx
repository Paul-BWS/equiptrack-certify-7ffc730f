import { Form } from "@/components/ui/form";
import { BasicDetails } from "../form-sections/BasicDetails";
import { NotesSection } from "../form-sections/NotesSection";
import { FormActions } from "../form-sections/FormActions";
import { useParams } from "react-router-dom";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import { useEffect } from "react";
import { useCertificateNumber } from "@/hooks/useCertificateNumber";
import { useTorqueWrenchForm } from "@/hooks/useTorqueWrenchForm";

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
  const { customerId } = useParams();
  const { data: equipment, isLoading } = useEquipmentData(equipmentId, open);
  const { certNumber, setCertNumber } = useCertificateNumber(equipmentId, open);
  const { form, onSubmit, isSaving } = useTorqueWrenchForm(
    equipmentId,
    customerId,
    () => onOpenChange(false),
    certNumber
  );

  // Update form when equipment data is loaded
  useEffect(() => {
    if (equipment) {
      form.reset({
        certNumber: equipment.cert_number || "",
        model: equipment.model || "",
        serialNumber: equipment.serial_number || "",
        engineer: equipment.engineer || "",
        min: equipment.min_torque?.toString() || "",
        max: equipment.max_torque?.toString() || "",
        units: equipment.units || "nm",
        lastServiceDate: equipment.last_service_date ? new Date(equipment.last_service_date) : new Date(),
        status: equipment.status || "ACTIVE",
        notes: equipment.notes || "",
      });
      if (equipment.cert_number) {
        setCertNumber(equipment.cert_number);
      }
    }
  }, [equipment, form, setCertNumber]);

  // Update cert number in form when it changes
  useEffect(() => {
    if (certNumber) {
      form.setValue('certNumber', certNumber);
    }
  }, [certNumber, form]);

  if (isLoading && equipmentId) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
        <BasicDetails form={form} />
        <NotesSection form={form} />
        <FormActions 
          onCancel={() => onOpenChange(false)} 
          onDelete={undefined}
          isSaving={isSaving}
          equipmentId={equipmentId}
        />
      </form>
    </Form>
  );
};