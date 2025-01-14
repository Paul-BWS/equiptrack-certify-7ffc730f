import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useEquipmentData = (equipmentId: string | null, enabled: boolean) => {
  return useQuery({
    queryKey: ['equipment', equipmentId],
    queryFn: async () => {
      if (!equipmentId) return null;
      
      const { data, error } = await supabase
        .from('torque_wrench')
        .select(`
          id,
          company_id,
          model,
          serial_number,
          min_torque,
          max_torque,
          units,
          last_service_date,
          next_service_due,
          engineer,
          result,
          notes,
          readings,
          definitive_readings,
          cert_number,
          status
        `)
        .eq('id', equipmentId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching equipment:', error);
        toast.error("Failed to load equipment data");
        throw error;
      }

      console.log('Fetched equipment data:', data);
      return data;
    },
    enabled: enabled && !!equipmentId
  });
};