import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Reading } from "@/types/equipment";

const parseReadings = (readingsStr: string | Reading[] | null): Reading[] => {
  if (!readingsStr) return [];
  
  if (Array.isArray(readingsStr)) {
    return readingsStr;
  }
  
  try {
    // Handle case where readings might be double-stringified
    const parsed = typeof readingsStr === 'string' ? JSON.parse(readingsStr) : readingsStr;
    return Array.isArray(parsed) ? parsed : JSON.parse(parsed);
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
      
      console.log('Fetching equipment data for ID:', equipmentId);
      
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
        console.log('Raw data from Supabase:', data);
        
        // Parse the readings and definitive_readings
        const parsedData = {
          ...data,
          readings: parseReadings(data.readings),
          definitive_readings: parseReadings(data.definitive_readings)
        };
        
        console.log('Parsed equipment data:', parsedData);
        return parsedData;
      }

      return null;
    },
    enabled: enabled && !!equipmentId,
    gcTime: 0, // Don't cache in garbage collector
    staleTime: 0, // Always fetch fresh data
    retry: 1 // Only retry once if failed
  });
};