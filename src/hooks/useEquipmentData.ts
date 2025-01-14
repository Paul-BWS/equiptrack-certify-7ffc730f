import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useEquipmentData = (equipmentId: string | null, enabled: boolean) => {
  return useQuery({
    queryKey: ['equipment', equipmentId],
    queryFn: async () => {
      if (!equipmentId) return null;
      
      console.log('Fetching equipment data for ID:', equipmentId);
      
      const { data, error } = await supabase
        .from('torque_wrench')
        .select('*')
        .eq('id', equipmentId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching equipment:', error);
        toast.error("Failed to load equipment data");
        throw error;
      }

      if (data) {
        console.log('Raw equipment data:', data);
        return data;
      }

      return null;
    },
    enabled: enabled && !!equipmentId,
    gcTime: 0,
    staleTime: 0,
    retry: 1
  });
};