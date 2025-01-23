import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomerEquipmentListProps {
  companyId: string;
}

export const CustomerEquipmentList = ({ companyId }: CustomerEquipmentListProps) => {
  const { data: equipment = [], isLoading } = useQuery({
    queryKey: ['customer-equipment', companyId],
    queryFn: async () => {
      // Fetch both torque wrenches and tyre gauges
      const [torqueResponse, tyreResponse] = await Promise.all([
        supabase
          .from('torque_wrench')
          .select('*')
          .eq('company_id', companyId),
        supabase
          .from('tyre_gauges')
          .select('*')
          .eq('company_id', companyId)
      ]);

      if (torqueResponse.error) throw torqueResponse.error;
      if (tyreResponse.error) throw tyreResponse.error;

      const torqueWrenches = torqueResponse.data.map(item => ({
        ...item,
        type: 'Torque Wrench'
      }));

      const tyreGauges = tyreResponse.data.map(item => ({
        ...item,
        type: 'Tyre Gauge'
      }));

      return [...torqueWrenches, ...tyreGauges];
    }
  });

  if (isLoading) {
    return <div className="animate-pulse h-32 bg-gray-100 rounded-lg" />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Your Equipment</h2>
      {equipment.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
        >
          <div className="space-y-1">
            <h3 className="font-medium">{item.model || 'Unknown Model'}</h3>
            <div className="text-sm text-gray-500">
              <p>S/N: {item.serial_number}</p>
              <p>Next Service: {new Date(item.next_service_due).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {item.type}
          </div>
        </div>
      ))}
    </div>
  );
};