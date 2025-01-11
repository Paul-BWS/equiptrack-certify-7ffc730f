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
    if (!torqueWrenchData) {
      toast.error("Invalid torque wrench data");
      return;
    }

    if (!torqueWrenchData.company_id) {
      toast.error("Company ID is required");
      return;
    }

    setIsSaving(true);
    try {
      console.log('Saving torque wrench with data:', torqueWrenchData);
      
      const dataToSave = {
        ...torqueWrenchData,
        readings: JSON.stringify(torqueWrenchData.readings),
        definitive_readings: JSON.stringify(torqueWrenchData.definitive_readings)
      };

      let result;
      
      if (equipmentId) {
        console.log('Updating existing torque wrench:', equipmentId);
        result = await supabase
          .from('torque_wrench')
          .update(dataToSave)
          .eq('id', equipmentId)
          .select()
          .single();
      } else {
        console.log('Creating new torque wrench');
        result = await supabase
          .from('torque_wrench')
          .insert([dataToSave])
          .select()
          .single();
      }

      if (result.error) {
        console.error('Error saving torque wrench:', result.error);
        throw result.error;
      }

      console.log('Successfully saved torque wrench:', result.data);

      // Save certificate data
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
      } else if (error.code === '22P02') {
        toast.error("Invalid ID format");
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