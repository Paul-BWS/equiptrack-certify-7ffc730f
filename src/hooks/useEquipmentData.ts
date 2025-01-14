import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { LiftingEquipment } from "@/types/equipment";

export const useEquipmentData = (equipmentId: string | null, isOpen: boolean) => {
  return useQuery({
    queryKey: ['lifting-equipment', equipmentId],
    queryFn: async () => {
      if (!equipmentId) return null;

      const { data, error } = await supabase
        .from('lifting_equipment')
        .select('*')
        .eq('id', equipmentId)
        .single();

      if (error) throw error;
      return data as LiftingEquipment;
    },
    enabled: !!equipmentId && isOpen,
  });
};