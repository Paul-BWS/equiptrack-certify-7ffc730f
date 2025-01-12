import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { TorqueWrench } from "@/types/equipment";
import { prepareCertificateData } from "@/utils/certificateDataPreparation";
import { useQueryClient } from "@tanstack/react-query";

export const useTorqueWrenchSubmit = (
  equipmentId: string | null,
  onSuccess: () => void
) => {
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

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
        id: equipmentId || crypto.randomUUID(),
        readings: JSON.stringify(torqueWrenchData.readings),
        definitive_readings: JSON.stringify(torqueWrenchData.definitive_readings),
        notes: torqueWrenchData.notes || null,
        updated_at: now,
        created_at: equipmentId ? undefined : now
      };

      let result;
      
      if (equipmentId) {
        console.log('Updating existing torque wrench:', equipmentId);
        const { id, created_at, ...updateData } = dataToSave;
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
        throw result.error;
      }

      console.log('Successfully saved torque wrench:', result.data);

      // Save certificate data only if it's a new record
      if (!equipmentId) {
        const certificate = prepareCertificateData(torqueWrenchData, result.data.id);
        const { error: certError } = await supabase
          .from('certificates')
          .insert([certificate]);

        if (certError) {
          console.error('Error saving certificate:', certError);
          throw certError;
        }
      }

      // Invalidate queries to refresh the list
      await queryClient.invalidateQueries({
        queryKey: ['equipment', torqueWrenchData.company_id, 'torque-wrenches']
      });

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