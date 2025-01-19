import { useForm } from "react-hook-form";
import { format, addDays } from "date-fns";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useTorqueWrenchSubmit } from "./useTorqueWrenchSubmit";

export const useTorqueWrenchForm = (
  equipmentId: string | null,
  customerId: string | undefined,
  onClose: () => void,
  certNumber: string
) => {
  const queryClient = useQueryClient();
  const today = new Date();
  
  const form = useForm({
    defaultValues: {
      certNumber: "",
      model: "",
      serialNumber: "",
      engineer: "",
      min: "",
      max: "",
      units: "nm",
      lastServiceDate: today,
      retestDate: addDays(today, 364),
      status: "ACTIVE",
      notes: "",
    }
  });

  const { handleSave, isSaving } = useTorqueWrenchSubmit(equipmentId, async () => {
    await queryClient.invalidateQueries({
      queryKey: ['equipment', customerId, 'torque-wrenches']
    });
    onClose();
  });

  const onSubmit = async (data: any) => {
    if (!customerId) return;

    try {
      const torqueWrenchData = {
        id: equipmentId || undefined,
        company_id: customerId,
        cert_number: certNumber,
        model: data.model,
        serial_number: data.serialNumber,
        min_torque: parseFloat(data.min),
        max_torque: parseFloat(data.max),
        units: data.units,
        engineer: data.engineer,
        status: data.status,
        notes: data.notes,
        last_service_date: format(data.lastServiceDate, 'yyyy-MM-dd'),
        next_service_due: format(data.retestDate, 'yyyy-MM-dd'),
      };

      await handleSave(torqueWrenchData);
    } catch (error) {
      console.error('Error saving torque wrench:', error);
      toast.error("Failed to save torque wrench data");
    }
  };

  return { form, onSubmit, isSaving };
};