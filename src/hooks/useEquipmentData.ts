import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { TorqueWrench } from "@/types/equipment";

export const useEquipmentData = (equipmentId: string | null, isEnabled: boolean) => {
  return useQuery({
    queryKey: ['torque_wrench', equipmentId],
    queryFn: async () => {
      if (!equipmentId) return null;
      
      console.log('Fetching torque wrench data for ID:', equipmentId);
      
      const { data, error, status } = await supabase
        .from('torque_wrench')
        .select('*')
        .eq('id', equipmentId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching torque wrench:', error);
        toast.error("Failed to load torque wrench data");
        throw error;
      }

      if (!data) {
        console.log('No torque wrench found with ID:', equipmentId);
        return null;
      }

      console.log('Fetched torque wrench data:', data);
      return data as TorqueWrench;
    },
    enabled: !!equipmentId && isEnabled,
    meta: {
      onError: (error: Error) => {
        console.error('Query error:', error);
        toast.error("Could not load torque wrench data. Please try again later.");
      }
    }
  });
};