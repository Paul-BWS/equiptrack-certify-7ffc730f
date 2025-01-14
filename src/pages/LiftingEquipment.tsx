import { Navigation } from "@/components/Navigation";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const LiftingEquipment = () => {
  const { customerId } = useParams();
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

  const { data: liftingEquipment = [], isLoading } = useQuery({
    queryKey: ['equipment', customerId, 'lifting-equipment'],
    queryFn: async () => {
      const { data: equipmentData, error } = await supabase
        .from('lifting_equipment')
        .select('*')
        .eq('company_id', customerId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching lifting equipment:', error);
        toast.error("Failed to load lifting equipment data");
        throw error;
      }

      return equipmentData;
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
          <h1 className="text-2xl font-bold">Lifting Equipment</h1>
          {/* We'll implement the full UI in the next iteration */}
          <p>Coming soon...</p>
        </div>
      </main>
    </div>
  );
};

export default LiftingEquipment;