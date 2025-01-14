import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useLiftingEquipmentSubmit = (
  equipmentId: string | null,
  onSuccess: () => void
) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (liftingEquipmentData: any) => {
    setIsSaving(true);
    try {
      if (equipmentId) {
        const { error } = await supabase
          .from('lifting_equipment')
          .update(liftingEquipmentData)
          .eq('id', equipmentId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('lifting_equipment')
          .insert([liftingEquipmentData]);

        if (error) throw error;
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving lifting equipment:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return { handleSave, isSaving };
};