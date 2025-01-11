import { Navigation } from "@/components/Navigation";
import { EquipmentList } from "@/components/EquipmentList";
import { Button } from "@/components/ui/button";
import { Grid, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { TorqueReadingsModal } from "@/components/TorqueReadingsModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const TorqueWrenches = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const isMobile = useIsMobile();
  const [showReadingsModal, setShowReadingsModal] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);

  const { data: customerData } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', customerId)
        .single();

      if (error) {
        console.error('Error fetching customer:', error);
        toast.error("Failed to load customer data");
        throw error;
      }

      return data;
    }
  });

  const { data: equipment = [], isLoading } = useQuery({
    queryKey: ['equipment', customerId],
    queryFn: async () => {
      console.log('Fetching equipment for customer:', customerId);
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('company_id', customerId);

      if (error) {
        console.error('Error fetching equipment:', error);
        toast.error("Failed to load equipment data");
        throw error;
      }

      console.log('Fetched equipment:', data);
      return data.map(item => ({
        id: item.id,
        model: item.model || '',
        serialNumber: item.serial_number || '',
        lastServiceDate: item.last_service_date || '',
        nextServiceDue: item.next_service_due || ''
      }));
    },
    meta: {
      onError: (error: Error) => {
        console.error('Query error:', error);
        toast.error("Could not load equipment data. Please try again later.");
      }
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto py-8">
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate(`/customers/${customerId}/equipment`)}
                  className="rounded-full bg-primary hover:bg-primary/90 w-10"
                >
                  <Grid className="h-4 w-4 text-primary-foreground" strokeWidth={2} />
                </Button>
                <Button 
                  size="icon"
                  onClick={() => setShowReadingsModal(true)}
                  className="rounded-full bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 text-primary-foreground" strokeWidth={2} />
                </Button>
              </div>
            </div>
            {customerData && (
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold">
                  {customerData.name}
                </h1>
              </div>
            )}
          </div>
          
          <EquipmentList
            equipment={equipment}
            onGenerateCertificate={(id) => {
              setSelectedEquipmentId(id);
              setShowReadingsModal(true);
            }}
          />
        </div>
      </main>

      <TorqueReadingsModal
        open={showReadingsModal}
        onOpenChange={setShowReadingsModal}
        equipmentId={selectedEquipmentId}
      />
    </div>
  );
};

export default TorqueWrenches;