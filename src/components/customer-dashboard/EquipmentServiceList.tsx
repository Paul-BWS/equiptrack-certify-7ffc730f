import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { format, parseISO, isAfter, subDays } from "date-fns";

interface EquipmentServiceListProps {
  companyId: string;
}

export const EquipmentServiceList = ({ companyId }: EquipmentServiceListProps) => {
  const navigate = useNavigate();

  const { data: equipment = [], isLoading } = useQuery({
    queryKey: ['equipment-due-service', companyId],
    queryFn: async () => {
      // Fetch torque wrenches
      const { data: torqueWrenches, error: torqueError } = await supabase
        .from('torque_wrench')
        .select('id, model, next_service_due')
        .eq('company_id', companyId)
        .order('next_service_due', { ascending: true });

      if (torqueError) {
        console.error('Error fetching torque wrenches:', torqueError);
        throw torqueError;
      }

      // Fetch tyre gauges
      const { data: tyreGauges, error: tyreError } = await supabase
        .from('tyre_gauges')
        .select('id, model, next_service_due')
        .eq('company_id', companyId)
        .order('next_service_due', { ascending: true });

      if (tyreError) {
        console.error('Error fetching tyre gauges:', tyreError);
        throw tyreError;
      }

      // Combine and format the equipment data
      const combinedEquipment = [
        ...(torqueWrenches?.map(tw => ({
          ...tw,
          type: 'torque-wrench' as const
        })) || []),
        ...(tyreGauges?.map(tg => ({
          ...tg,
          type: 'tyre-gauge' as const
        })) || [])
      ];

      // Filter to only show equipment due for service within the next 30 days
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      return combinedEquipment
        .filter(item => {
          if (!item.next_service_due) return false;
          const serviceDate = parseISO(item.next_service_due);
          return isAfter(serviceDate, new Date()) && !isAfter(serviceDate, thirtyDaysFromNow);
        })
        .sort((a, b) => {
          if (!a.next_service_due || !b.next_service_due) return 0;
          return parseISO(a.next_service_due).getTime() - parseISO(b.next_service_due).getTime();
        });
    }
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Equipment Due for Service
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getEquipmentRoute = (type: string) => {
    switch (type) {
      case 'torque-wrench':
        return 'torque-wrenches';
      case 'tyre-gauge':
        return 'tyre-gauges';
      default:
        return type + 's';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Equipment Due for Service
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {equipment.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No equipment due for service in the next 30 days
            </p>
          ) : (
            equipment.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="flex items-center justify-between p-4 rounded-lg border bg-[#F9F9F9]"
              >
                <div>
                  <h3 className="font-medium text-sm">{item.model}</h3>
                  <p className="text-xs text-[#B3B3B3]">
                    Next Service: {format(parseISO(item.next_service_due), 'dd/MM/yyyy')}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white hover:bg-white/90 border-[#0EA5E9] text-[#0EA5E9] h-10 w-10 p-0"
                  onClick={() => navigate(`/customers/${companyId}/equipment/${getEquipmentRoute(item.type)}`)}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
