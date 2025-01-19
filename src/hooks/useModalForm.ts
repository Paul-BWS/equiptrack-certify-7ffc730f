import { useState, useEffect } from "react";
import { TorqueReadingsForm } from "./useTorqueReadingsForm";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const initialFormState: TorqueReadingsForm = {
  certNumber: `BWS-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  date: new Date().toISOString().split('T')[0],
  retestDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  model: "",
  serialNumber: "",
  engineer: "",
  min: "",
  max: "",
  units: "nm",
  status: "ACTIVE",
  sentOn: new Date().toISOString(),
  result: "PASS",
  notes: "",
  target1: "",
  actual1: "",
  deviation1: "",
  target2: "",
  actual2: "",
  deviation2: "",
  target3: "",
  actual3: "",
  deviation3: "",
  def_target1: "",
  def_actual1: "",
  def_deviation1: "",
  def_target2: "",
  def_actual2: "",
  def_deviation2: "",
  def_target3: "",
  def_actual3: "",
  def_deviation3: ""
};

export const useModalForm = (equipmentId: string | null, onClose: () => void) => {
  const [readings, setReadings] = useState<TorqueReadingsForm>(initialFormState);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();
  const { customerId } = useParams();

  useEffect(() => {
    const fetchEquipment = async () => {
      if (!equipmentId) {
        setReadings(initialFormState);
        return;
      }

      const { data: equipment, error } = await supabase
        .from('torque_wrench')
        .select('*')
        .eq('id', equipmentId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching equipment:', error);
        toast.error("Failed to load equipment data");
        return;
      }

      if (equipment) {
        setReadings({
          model: equipment.model || '',
          serialNumber: equipment.serial_number || '',
          min: equipment.min_torque?.toString() || '',
          max: equipment.max_torque?.toString() || '',
          units: equipment.units || 'nm',
          date: equipment.last_service_date || new Date().toISOString().split('T')[0],
          retestDate: equipment.next_service_due || '',
          engineer: equipment.engineer || '',
          result: equipment.result || 'PASS',
          notes: equipment.notes || '',
          certNumber: equipment.cert_number || `BWS-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          status: equipment.status || 'ACTIVE',
          sentOn: equipment.sent_on || new Date().toISOString(),
          target1: equipment.target1 || '',
          actual1: equipment.actual1 || '',
          deviation1: equipment.deviation1 || '',
          target2: equipment.target2 || '',
          actual2: equipment.actual2 || '',
          deviation2: equipment.deviation2 || '',
          target3: equipment.target3 || '',
          actual3: equipment.actual3 || '',
          deviation3: equipment.deviation3 || '',
          def_target1: equipment.def_target1 || '',
          def_actual1: equipment.def_actual1 || '',
          def_deviation1: equipment.def_deviation1 || '',
          def_target2: equipment.def_target2 || '',
          def_actual2: equipment.def_actual2 || '',
          def_deviation2: equipment.def_deviation2 || '',
          def_target3: equipment.def_target3 || '',
          def_actual3: equipment.def_actual3 || '',
          def_deviation3: equipment.def_deviation3 || ''
        });
      }
    };

    fetchEquipment();
  }, [equipmentId]);

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
      onClose();
    } catch (error) {
      console.error('Error saving torque wrench:', error);
      toast.error("Failed to save torque wrench");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    readings,
    setReadings,
    handleSubmit,
    isSaving
  };
};