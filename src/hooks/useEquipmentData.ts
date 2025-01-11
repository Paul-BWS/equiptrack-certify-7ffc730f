import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useEquipmentData = (equipmentId: string | null, isEnabled: boolean) => {
  return useQuery({
    queryKey: ['equipment', equipmentId],
    queryFn: async () => {
      if (!equipmentId) return null;
      
      console.log('Fetching equipment data for ID:', equipmentId);
      
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('id', equipmentId)
        .single();

      if (error) {
        console.error('Error fetching equipment:', error);
        toast.error("Failed to load equipment data");
        throw error;
      }

      console.log('Fetched equipment data:', data);
      return data;
    },
    enabled: !!equipmentId && isEnabled,
  });
};