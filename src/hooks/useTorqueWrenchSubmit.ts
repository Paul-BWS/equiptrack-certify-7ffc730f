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

    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.error('Authentication error:', authError);
      toast.error("Authentication error. Please sign in again.");
      return;
    }

    if (!session) {
      console.error('No active session found');
      toast.error("Please sign in to save equipment data");
      return;
    }

    console.log('Current session:', session);
    console.log('Company ID:', torqueWrenchData.company_id);
    
    setIsSaving(true);
    try {
      console.log('Saving torque wrench with data:', torqueWrenchData);
      
      const now = new Date().toISOString();
      const dataToSave = {
        ...torqueWrenchData,
        readings: JSON.stringify(torqueWrenchData.readings),
        definitive_readings: JSON.stringify(torqueWrenchData.definitive_readings),
        notes: torqueWrenchData.notes || null,
        updated_at: now,
        created_at: equipmentId ? undefined : now
      };

      let result;
      
      if (equipmentId) {
        console.log('Updating existing torque wrench:', equipmentId);
        const { created_at, ...updateData } = dataToSave;
        result = await supabase
          .from('torque_wrench')
          .update(updateData)
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
        console.error('Database operation error:', result.error);
        if (result.error.code === '42501') {
          throw new Error('You do not have permission to perform this action. Please check if you have access to this company.');
        }
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

      toast.success("Equipment data saved successfully");
      onSuccess();
    } catch (error: any) {
      console.error('Error saving data:', error);
      if (error.message.includes('permission')) {
        toast.error(error.message);
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