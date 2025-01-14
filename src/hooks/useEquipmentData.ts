import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Reading } from "@/types/equipment";

const parseReadings = (readingsStr: string | null): Reading[] => {
  if (!readingsStr) return [];
  try {
    return JSON.parse(readingsStr);
  } catch (e) {
    console.error('Error parsing readings:', e);
    return [];
  }
};

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

      if (data) {
        // Parse the readings and definitive_readings strings into arrays
        return {
          ...data,
          readings: parseReadings(data.readings as string),
          definitive_readings: parseReadings(data.definitive_readings as string)
        };
      }

      return data;
    },
    enabled: enabled && !!equipmentId,
    gcTime: 0, // Don't cache in garbage collector
    staleTime: 0 // Always fetch fresh data
  });
};