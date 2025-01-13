import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Equipment, TorqueWrenchResponse, TyreGaugeResponse } from "@/types/equipment-responses";

export const useEquipmentQuery = () => {
  return useQuery({
    queryKey: ['all-equipment'],
    queryFn: async () => {
      const { data: torqueWrenches, error: torqueError } = await supabase
        .from('torque_wrench')
        .select(`
          id,
          model,
          serial_number,
          last_service_date,
          next_service_due,
          company_id,
          companies!inner(name)
        `);

      if (torqueError) {
        console.error('Error fetching torque wrenches:', torqueError);
        throw torqueError;
      }

      const { data: tyreGauges, error: tyreError } = await supabase
        .from('tyre_gauges')
        .select(`
          id,
          model,
          serial_number,
          last_service_date,
          next_service_due,
          company_id,
          companies!inner(name)
        `);

      if (tyreError) {
        console.error('Error fetching tyre gauges:', tyreError);
        throw tyreError;
      }

      const equipment: Equipment[] = [
        ...(torqueWrenches?.map((tw: TorqueWrenchResponse) => ({
          id: tw.id,
          model: tw.model || '',
          serialNumber: tw.serial_number || '',
          lastServiceDate: tw.last_service_date || '',
          nextServiceDue: tw.next_service_due || '',
          companyName: tw.companies?.name || 'Unknown Company',
          equipmentType: 'Torque Wrench'
        })) || []),
        ...(tyreGauges?.map((tg: TyreGaugeResponse) => ({
          id: tg.id,
          model: tg.model || '',
          serialNumber: tg.serial_number || '',
          lastServiceDate: tg.last_service_date || '',
          nextServiceDue: tg.next_service_due || '',
          companyName: tg.companies?.name || 'Unknown Company',
          equipmentType: 'Tyre Gauge'
        })) || [])
      ];

      return equipment;
    }
  });
};