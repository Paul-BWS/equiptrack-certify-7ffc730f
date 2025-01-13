import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Equipment } from "@/types/equipment-responses";

interface UseEquipmentQueryOptions {
  enabled?: boolean;
}

export const useEquipmentQuery = (options: UseEquipmentQueryOptions = {}) => {
  return useQuery({
    queryKey: ['all-equipment'],
    queryFn: async () => {
      // Fetch torque wrenches
      const { data: torqueWrenches, error: torqueError } = await supabase
        .from('torque_wrench')
        .select(`
          id,
          model,
          serial_number,
          last_service_date,
          next_service_due,
          company_id
        `);

      if (torqueError) {
        console.error('Error fetching torque wrenches:', torqueError);
        throw torqueError;
      }

      // Fetch tyre gauges
      const { data: tyreGauges, error: tyreError } = await supabase
        .from('tyre_gauges')
        .select(`
          id,
          model,
          serial_number,
          last_service_date,
          next_service_due,
          company_id
        `);

      if (tyreError) {
        console.error('Error fetching tyre gauges:', tyreError);
        throw tyreError;
      }

      // Get unique company IDs
      const companyIds = [...new Set([
        ...(torqueWrenches?.map(tw => tw.company_id) || []),
        ...(tyreGauges?.map(tg => tg.company_id) || [])
      ])];

      // Fetch company names
      const { data: companies, error: companiesError } = await supabase
        .from('companies')
        .select('id, name')
        .in('id', companyIds);

      if (companiesError) {
        console.error('Error fetching companies:', companiesError);
        throw companiesError;
      }

      // Create a map of company IDs to names for faster lookup
      const companyMap = new Map(companies?.map(c => [c.id, c.name]));

      const equipment: Equipment[] = [
        ...(torqueWrenches?.map(tw => ({
          id: tw.id,
          model: tw.model || '',
          serialNumber: tw.serial_number || '',
          lastServiceDate: tw.last_service_date || '',
          nextServiceDue: tw.next_service_due || '',
          companyName: companyMap.get(tw.company_id) || 'Unknown Company',
          equipmentType: 'Torque Wrench'
        })) || []),
        ...(tyreGauges?.map(tg => ({
          id: tg.id,
          model: tg.model || '',
          serialNumber: tg.serial_number || '',
          lastServiceDate: tg.last_service_date || '',
          nextServiceDue: tg.next_service_due || '',
          companyName: companyMap.get(tg.company_id) || 'Unknown Company',
          equipmentType: 'Tyre Gauge'
        })) || [])
      ];

      return equipment;
    },
    enabled: options.enabled
  });
};