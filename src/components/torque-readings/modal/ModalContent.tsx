import { DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { BasicDetails } from "../form-sections/BasicDetails";
import { NotesSection } from "../form-sections/NotesSection";
import { FormActions } from "../form-sections/FormActions";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useTorqueWrenchSubmit } from "@/hooks/useTorqueWrenchSubmit";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import { format, addDays } from "date-fns";
import { useEffect, useState } from "react";

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
  const queryClient = useQueryClient();
  const { customerId } = useParams();
  const { data: equipment, isLoading } = useEquipmentData(equipmentId, open);
  const [certNumber, setCertNumber] = useState<string>("");

  useEffect(() => {
    const fetchCertNumber = async () => {
      if (!equipmentId && open) {
        try {
          const { data: newCertNumber, error } = await supabase
            .rpc('get_next_certificate_number');
          
          if (error) throw error;
          setCertNumber(newCertNumber);
        } catch (error) {
          console.error('Error fetching certificate number:', error);
          toast.error("Failed to generate certificate number");
        }
      } else if (equipment?.cert_number) {
        setCertNumber(equipment.cert_number);
      }
    };

    fetchCertNumber();
  }, [equipmentId, equipment?.cert_number, open]);

  const form = useForm({
    defaultValues: {
      certNumber: certNumber,
      model: equipment?.model || "",
      serialNumber: equipment?.serial_number || "",
      engineer: equipment?.engineer || "",
      min: equipment?.min_torque?.toString() || "",
      max: equipment?.max_torque?.toString() || "",
      units: equipment?.units || "nm",
      lastServiceDate: equipment?.last_service_date ? new Date(equipment.last_service_date) : new Date(),
      status: equipment?.status || "ACTIVE",
      notes: equipment?.notes || "",
    }
  });

  useEffect(() => {
    if (certNumber) {
      form.setValue('certNumber', certNumber);
    }
  }, [certNumber, form]);

  const { handleSave, isSaving } = useTorqueWrenchSubmit(equipmentId, async () => {
    await queryClient.invalidateQueries({
      queryKey: ['equipment', customerId, 'torque-wrenches']
    });
    onOpenChange(false);
  });

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('torque_wrench')
        .delete()
        .eq('id', equipmentId);

      if (error) throw error;

      toast.success("Torque wrench deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: ['equipment', customerId, 'torque-wrenches']
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error deleting torque wrench:', error);
      toast.error("Failed to delete torque wrench");
    }
  };

  const onSubmit = async (data: any) => {
    if (!customerId) return;

    try {
      const nextServiceDate = addDays(data.lastServiceDate, 364);
      
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
        next_service_due: format(nextServiceDate, 'yyyy-MM-dd'),
      };

      await handleSave(torqueWrenchData);
    } catch (error) {
      console.error('Error saving torque wrench:', error);
      toast.error("Failed to save torque wrench data");
    }
  };

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
          onDelete={handleDelete}
          isSaving={isSaving}
          equipmentId={equipmentId}
        />
      </form>
    </Form>
  );
};