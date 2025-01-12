import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useStaffMembers = () => {
  return useQuery({
    queryKey: ['staff'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .eq('role', 'ENGINEER')
        .eq('status', 'ACTIVE')
        .order('name');

      if (error) {
        console.error('Error fetching staff:', error);
        throw error;
      }

      return data || [];
    }
  });
};