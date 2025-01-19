import { DialogContent } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { ModalForm } from "./ModalForm";
import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";
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

  const [readings, setReadings] = useState<TorqueReadingsForm>({
    certNumber: equipment?.cert_number || `BWS-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    model: equipment?.model || "",
    serialNumber: equipment?.serial_number || "",
    engineer: equipment?.engineer || "",
    date: equipment?.last_service_date || new Date().toISOString(),
    retestDate: equipment?.next_service_due || "",
    min: equipment?.min_torque?.toString() || "",
    max: equipment?.max_torque?.toString() || "",
    units: equipment?.units || "nm",
    result: equipment?.result || "PASS",
    status: equipment?.status || "ACTIVE",
    notes: equipment?.notes || "",
    sentOn: equipment?.last_service_date || new Date().toISOString(),
    target1: equipment?.target1 || "",
    actual1: equipment?.actual1 || "",
    deviation1: equipment?.deviation1 || "",
    target2: equipment?.target2 || "",
    actual2: equipment?.actual2 || "",
    deviation2: equipment?.deviation2 || "",
    target3: equipment?.target3 || "",
    actual3: equipment?.actual3 || "",
    deviation3: equipment?.deviation3 || "",
    def_target1: equipment?.def_target1 || "",
    def_actual1: equipment?.def_actual1 || "",
    def_deviation1: equipment?.def_deviation1 || "",
    def_target2: equipment?.def_target2 || "",
    def_actual2: equipment?.def_actual2 || "",
    def_deviation2: equipment?.def_deviation2 || "",
    def_target3: equipment?.def_target3 || "",
    def_actual3: equipment?.def_actual3 || "",
    def_deviation3: equipment?.def_deviation3 || ""
  });

  // Update readings when equipment data is loaded
  useEffect(() => {
    if (equipment) {
      setReadings(prev => ({
        ...prev,
        model: equipment.model || "",
        serialNumber: equipment.serial_number || "",
        engineer: equipment.engineer || "",
        min: equipment.min_torque?.toString() || "",
        max: equipment.max_torque?.toString() || "",
        units: equipment.units || "nm",
        date: equipment.last_service_date || new Date().toISOString(),
        retestDate: equipment.next_service_due || "",
        result: equipment.result || "PASS",
        status: equipment.status || "ACTIVE",
        notes: equipment.notes || "",
        certNumber: equipment.cert_number || `BWS-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        target1: equipment.target1 || "",
        actual1: equipment.actual1 || "",
        deviation1: equipment.deviation1 || "",
        target2: equipment.target2 || "",
        actual2: equipment.actual2 || "",
        deviation2: equipment.deviation2 || "",
        target3: equipment.target3 || "",
        actual3: equipment.actual3 || "",
        deviation3: equipment.deviation3 || "",
        def_target1: equipment.def_target1 || "",
        def_actual1: equipment.def_actual1 || "",
        def_deviation1: equipment.def_deviation1 || "",
        def_target2: equipment.def_target2 || "",
        def_actual2: equipment.def_actual2 || "",
        def_deviation2: equipment.def_deviation2 || "",
        def_target3: equipment.def_target3 || "",
        def_actual3: equipment.def_actual3 || "",
        def_deviation3: equipment.def_deviation3 || ""
      }));
    }
  }, [equipment]);

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
        min_torque: parseFloat(readings.min),
        max_torque: parseFloat(readings.max),
        units: readings.units,
        last_service_date: readings.date,
        next_service_due: readings.retestDate,
        result: readings.result,
        notes: readings.notes,
        status: readings.status,
        target1: readings.target1,
        actual1: readings.actual1,
        deviation1: readings.deviation1,
        target2: readings.target2,
        actual2: readings.actual2,
        deviation2: readings.deviation2,
        target3: readings.target3,
        actual3: readings.actual3,
        deviation3: readings.deviation3,
        def_target1: readings.def_target1,
        def_actual1: readings.def_actual1,
        def_deviation1: readings.def_deviation1,
        def_target2: readings.def_target2,
        def_actual2: readings.def_actual2,
        def_deviation2: readings.def_deviation2,
        def_target3: readings.def_target3,
        def_actual3: readings.def_actual3,
        def_deviation3: readings.def_deviation3
      };

      const { error } = equipmentId
        ? await supabase.from('torque_wrench').update(data).eq('id', equipmentId)
        : await supabase.from('torque_wrench').insert(data);

      if (error) throw error;

      toast.success(equipmentId ? "Equipment updated successfully" : "Equipment added successfully");
      await queryClient.invalidateQueries({
        queryKey: ['equipment', customerId, 'torque-wrenches']
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving torque wrench:', error);
      toast.error("Failed to save torque wrench");
    } finally {
      setIsSaving(false);
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
    <DialogContent className="max-w-3xl bg-white">
      <ModalForm
        readings={readings}
        setReadings={setReadings}
        onSubmit={handleSubmit}
        onClose={() => onOpenChange(false)}
        isSaving={isSaving}
        equipmentId={equipmentId}
      />
    </DialogContent>
  );
};