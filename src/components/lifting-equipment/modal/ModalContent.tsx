import { DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { ModalForm } from "./ModalForm";
import { LiftingEquipmentReadings } from "@/types/lifting-equipment-form";
import { useEquipmentData } from "@/hooks/useEquipmentData";

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
  const [isSaving, setIsSaving] = useState(false);
  const { data: equipment, isLoading } = useEquipmentData(equipmentId, open);

  const [readings, setReadings] = useState<LiftingEquipmentReadings>({
    certNumber: equipment?.cert_number || `BWS-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    model: equipment?.model || "",
    serialNumber: equipment?.serial_number || "",
    engineer: equipment?.engineer || "",
    date: equipment?.last_service_date || new Date().toISOString(),
    retestDate: equipment?.next_service_due || "",
    capacity: equipment?.capacity?.toString() || "",
    units: equipment?.units || "",
    result: equipment?.test_result || "",
    status: equipment?.status || "ACTIVE",
    notes: equipment?.notes || "",
    platform_condition: equipment?.platform_condition || "PASS",
    control_box_condition: equipment?.control_box_condition || "PASS",
    hydraulic_hoses_condition: equipment?.hydraulic_hoses_condition || "PASS",
    main_structure_inspection: equipment?.main_structure_inspection || "PASS",
    oil_levels: equipment?.oil_levels || "PASS",
    rollers_and_guides: equipment?.rollers_and_guides || "PASS",
    safety_mechanism: equipment?.safety_mechanism || "PASS",
    scissor_operation: equipment?.scissor_operation || "PASS",
    securing_bolts: equipment?.securing_bolts || "PASS",
    toe_guards: equipment?.toe_guards || "PASS",
    lubrication_moving_parts: equipment?.lubrication_moving_parts || "PASS"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const data = {
        id: equipmentId || undefined,
        company_id: customerId,
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

      const { error } = equipmentId
        ? await supabase.from('lifting_equipment').update(data).eq('id', equipmentId)
        : await supabase.from('lifting_equipment').insert(data);

      if (error) throw error;

      toast.success(equipmentId ? "Equipment updated successfully" : "Equipment added successfully");
      await queryClient.invalidateQueries({
        queryKey: ['equipment', customerId, 'lifting-equipment']
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving lifting equipment:', error);
      toast.error("Failed to save lifting equipment");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('lifting_equipment')
        .delete()
        .eq('id', equipmentId);

      if (error) throw error;

      toast.success("Equipment deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: ['equipment', customerId, 'lifting-equipment']
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error deleting lifting equipment:', error);
      toast.error("Failed to delete lifting equipment");
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
    <DialogContent className="max-w-3xl">
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