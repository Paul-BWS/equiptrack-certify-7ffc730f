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
      // First, check if the record exists
      const { data: existingData, error: fetchError } = await supabase
        .from('torque_wrench')
        .select('id')
        .eq('id', equipmentId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      let torqueWrenchError;
      if (existingData) {
        // Update existing record
        const { error } = await supabase
          .from('torque_wrench')
          .update(torqueWrenchData)
          .eq('id', equipmentId);
        torqueWrenchError = error;
      } else {
        // Insert new record
        const { error } = await supabase
          .from('torque_wrench')
          .insert([torqueWrenchData]);
        torqueWrenchError = error;
      }

      if (torqueWrenchError) {
        console.error('Error saving torque wrench:', torqueWrenchError);
        throw torqueWrenchError;
      }

      // Only proceed with certificate if torque wrench was saved successfully
      const certificate = prepareCertificateData(torqueWrenchData, equipmentId);
      const { error: certError } = await supabase
        .from('certificates')
        .insert([certificate]);

      if (certError) {
        console.error('Error saving certificate:', certError);
        throw certError;
      }

      onSuccess();
    } catch (error: any) {
      console.error('Error saving data:', error);
      if (error.code === '42501') {
        toast.error("Permission denied. Please check your access rights.");
      } else {
        toast.error("Failed to save torque wrench data");
      }
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return { handleSave, isSaving };
};