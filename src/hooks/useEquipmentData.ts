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
        .select(`
          id,
          company_id,
          cert_number,
          model,
          serial_number,
          engineer,
          last_service_date,
          next_service_due,
          test_result,
          notes,
          status,
          platform_condition,
          control_box_condition,
          hydraulic_hoses_condition,
          main_structure_inspection,
          oil_levels,
          rollers_and_guides,
          safety_mechanism,
          scissor_operation,
          securing_bolts,
          toe_guards,
          lubrication_moving_parts
        `)
        .eq('id', equipmentId)
        .single();

      if (error) throw error;

      // Map test_result to result for frontend compatibility
      return {
        ...data,
        result: data.test_result
      } as LiftingEquipment;
    },
    enabled: !!equipmentId && isOpen,
  });
};