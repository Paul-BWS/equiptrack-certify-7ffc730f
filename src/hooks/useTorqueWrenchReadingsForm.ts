import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { format, addDays, parseISO } from "date-fns";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";

export interface TorqueWrenchFormData {
  certNumber: string;
  model: string;
  serialNumber: string;
  engineer: string;
  min: string;
  max: string;
  units: string;
  date: string;
  retestDate: string;
  status: string;
  notes: string;
  target1: string;
  actual1: string;
  deviation1: string;
  target2: string;
  actual2: string;
  deviation2: string;
  target3: string;
  actual3: string;
  deviation3: string;
  def_target1: string;
  def_actual1: string;
  def_deviation1: string;
  def_target2: string;
  def_actual2: string;
  def_deviation2: string;
  def_target3: string;
  def_actual3: string;
  def_deviation3: string;
}

export const useTorqueWrenchReadingsForm = (
  equipmentId: string | null,
  onOpenChange: (open: boolean) => void
) => {
  const { customerId } = useParams();
  const [isSaving, setIsSaving] = useState(false);

  const defaultValues: TorqueWrenchFormData = {
    certNumber: generateCertificateNumber(),
    model: "",
    serialNumber: "",
    engineer: "",
    min: "",
    max: "",
    units: "nm",
    date: format(new Date(), 'yyyy-MM-dd'),
    retestDate: format(addDays(new Date(), 364), 'yyyy-MM-dd'),
    status: "ACTIVE",
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

  const form = useForm<TorqueWrenchFormData>({
    defaultValues,
  });

  const { data: existingWrench } = useQuery({
    queryKey: ['torque-wrench', equipmentId],
    queryFn: async () => {
      if (!equipmentId) return null;
      
      const { data, error } = await supabase
        .from('torque_wrench')
        .select('*')
        .eq('id', equipmentId)
        .single();

      if (error) {
        console.error('Error fetching torque wrench:', error);
        toast.error("Failed to load torque wrench data");
        throw error;
      }

      return data;
    },
    enabled: !!equipmentId,
  });

  useEffect(() => {
    if (!equipmentId) {
      form.reset(defaultValues);
    } else if (existingWrench) {
      form.reset({
        certNumber: existingWrench.cert_number || generateCertificateNumber(),
        model: existingWrench.model || "",
        serialNumber: existingWrench.serial_number || "",
        engineer: existingWrench.engineer || "",
        min: existingWrench.min_torque?.toString() || "",
        max: existingWrench.max_torque?.toString() || "",
        units: existingWrench.units || "nm",
        date: existingWrench.last_service_date || format(new Date(), 'yyyy-MM-dd'),
        retestDate: existingWrench.next_service_due || format(addDays(new Date(), 364), 'yyyy-MM-dd'),
        status: existingWrench.status || "ACTIVE",
        notes: existingWrench.notes || "",
        target1: existingWrench.target1 || "",
        actual1: existingWrench.actual1 || "",
        deviation1: existingWrench.deviation1 || "",
        target2: existingWrench.target2 || "",
        actual2: existingWrench.actual2 || "",
        deviation2: existingWrench.deviation2 || "",
        target3: existingWrench.target3 || "",
        actual3: existingWrench.actual3 || "",
        deviation3: existingWrench.deviation3 || "",
        def_target1: existingWrench.def_target1 || "",
        def_actual1: existingWrench.def_actual1 || "",
        def_deviation1: existingWrench.def_deviation1 || "",
        def_target2: existingWrench.def_target2 || "",
        def_actual2: existingWrench.def_actual2 || "",
        def_deviation2: existingWrench.def_deviation2 || "",
        def_target3: existingWrench.def_target3 || "",
        def_actual3: existingWrench.def_actual3 || "",
        def_deviation3: existingWrench.def_deviation3 || ""
      });
    }
  }, [equipmentId, existingWrench, form]);

  const onSubmit = async (data: TorqueWrenchFormData) => {
    if (!customerId) return;
    setIsSaving(true);

    try {
      const torqueWrenchData = {
        company_id: customerId,
        cert_number: data.certNumber,
        model: data.model,
        serial_number: data.serialNumber,
        min_torque: parseFloat(data.min),
        max_torque: parseFloat(data.max),
        units: data.units,
        engineer: data.engineer,
        status: data.status,
        notes: data.notes,
        last_service_date: data.date,
        next_service_due: data.retestDate,
        target1: data.target1,
        actual1: data.actual1,
        deviation1: data.deviation1,
        target2: data.target2,
        actual2: data.actual2,
        deviation2: data.deviation2,
        target3: data.target3,
        actual3: data.actual3,
        deviation3: data.deviation3,
        def_target1: data.def_target1,
        def_actual1: data.def_actual1,
        def_deviation1: data.def_deviation1,
        def_target2: data.def_target2,
        def_actual2: data.def_actual2,
        def_deviation2: data.def_deviation2,
        def_target3: data.def_target3,
        def_actual3: data.def_actual3,
        def_deviation3: data.def_deviation3
      };

      if (equipmentId) {
        const { error } = await supabase
          .from("torque_wrench")
          .update(torqueWrenchData)
          .eq("id", equipmentId);

        if (error) throw error;
        toast.success("Torque wrench updated successfully");
      } else {
        const { error } = await supabase
          .from("torque_wrench")
          .insert([torqueWrenchData]);

        if (error) throw error;
        toast.success("New torque wrench created successfully");
      }

      onOpenChange(false);
    } catch (error) {
      console.error("Error saving torque wrench:", error);
      toast.error(
        equipmentId
          ? "Failed to update torque wrench"
          : "Failed to create new torque wrench"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return {
    form,
    isSaving,
    onSubmit: form.handleSubmit(onSubmit),
  };
};