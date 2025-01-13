import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { format, parseISO, isAfter } from "date-fns";
import { toast } from "sonner";

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
        .select('id, model, serial_number, next_service_due')
        .eq('company_id', companyId)
        .order('next_service_due', { ascending: true });

      if (torqueError) {
        console.error('Error fetching torque wrenches:', torqueError);
        throw torqueError;
      }

      // Fetch tyre gauges
      const { data: tyreGauges, error: tyreError } = await supabase
        .from('tyre_gauges')
        .select('id, model, serial_number, next_service_due')
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
          type: 'torque-wrench' as const,
          displayType: 'Torque Wrench'
        })) || []),
        ...(tyreGauges?.map(tg => ({
          ...tg,
          type: 'tyre-gauge' as const,
          displayType: 'Tyre Gauge'
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

  const handleSendReminder = async () => {
    try {
      const response = await supabase.functions.invoke('send-reminder-email', {
        body: { companyId }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast.success("Service reminder email sent successfully");
    } catch (error: any) {
      console.error('Error sending reminder email:', error);
      toast.error("Failed to send reminder email");
    }
  };

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

  if (isLoading) {
    return (
      <Card className="bg-white border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
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

  return (
    <Card className="bg-white border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Equipment Due for Service
        </CardTitle>
        {equipment.length > 0 && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleSendReminder}
            className="rounded-full bg-white border-2 border-primary hover:bg-primary/10"
          >
            <Mail className="h-4 w-4 text-primary" strokeWidth={2} />
          </Button>
        )}
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
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm text-gray-900">{item.model}</h3>
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
                      {item.displayType}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    S/N: {item.serial_number}
                  </p>
                  <p className="text-xs text-gray-500">
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