import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { TorqueWrench } from "@/types/equipment";
import { prepareCertificateData } from "@/utils/certificateDataPreparation";

export const useTorqueWrenchSubmit = (
  equipmentId: string | null,
  onSuccess: () => void
) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (torqueWrenchData: TorqueWrench) => {
    if (!torqueWrenchData) return;

    setIsSaving(true);
    try {
      const { error: torqueWrenchError } = await supabase
        .from('torque_wrench')
        .upsert([torqueWrenchData]);

      if (torqueWrenchError) throw torqueWrenchError;

      const certificate = prepareCertificateData(torqueWrenchData, equipmentId);
      const { error: certError } = await supabase
        .from('certificates')
        .insert([certificate]);

      if (certError) throw certError;

      toast.success("Torque wrench data saved successfully");
      onSuccess();
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error("Failed to save torque wrench data");
    } finally {
      setIsSaving(false);
    }
  };

  return { handleSave, isSaving };
};