import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { format, parseISO, isAfter } from "date-fns";
import { toast } from "sonner";
import { LoadingState } from "./equipment-service/LoadingState";
import { EquipmentItem } from "./equipment-service/EquipmentItem";
import { Header } from "./equipment-service/Header";

interface EquipmentServiceListProps {
  companyId: string;
}

export const EquipmentServiceList = ({ companyId }: EquipmentServiceListProps) => {
  const { data: equipment = [], isLoading } = useQuery({
    queryKey: ['equipment-due-service', companyId],
    queryFn: async () => {
      const { data: torqueWrenches, error: torqueError } = await supabase
        .from('torque_wrench')
        .select('id, model, serial_number, next_service_due')
        .eq('company_id', companyId)
        .order('next_service_due', { ascending: true });

      if (torqueError) {
        console.error('Error fetching torque wrenches:', torqueError);
        throw torqueError;
      }

      const { data: tyreGauges, error: tyreError } = await supabase
        .from('tyre_gauges')
        .select('id, model, serial_number, next_service_due')
        .eq('company_id', companyId)
        .order('next_service_due', { ascending: true });

      if (tyreError) {
        console.error('Error fetching tyre gauges:', tyreError);
        throw tyreError;
      }

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
      toast.loading("Sending service reminder email...");
      
      const response = await supabase.functions.invoke('send-reminder-email', {
        body: { companyId }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast.dismiss();
      toast.success("Service reminder email sent successfully", {
        description: "The reminder has been sent to the registered email address.",
        duration: 5000,
      });
    } catch (error: any) {
      console.error('Error sending reminder email:', error);
      toast.error("Failed to send reminder email", {
        description: "Please try again later or contact support if the problem persists.",
        duration: 5000,
      });
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Card className="bg-white border-none shadow-sm">
      <CardHeader>
        <Header 
          showEmailButton={equipment.length > 0} 
          onSendReminder={handleSendReminder}
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {equipment.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No equipment due for service in the next 30 days
            </p>
          ) : (
            equipment.map((item) => (
              <EquipmentItem
                key={`${item.type}-${item.id}`}
                {...item}
                companyId={companyId}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};