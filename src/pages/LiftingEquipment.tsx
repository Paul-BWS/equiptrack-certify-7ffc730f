import { Navigation } from "@/components/Navigation";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { LiftingEquipmentHeader } from "@/components/lifting-equipment/LiftingEquipmentHeader";
import { LiftingEquipmentList } from "@/components/lifting-equipment/LiftingEquipmentList";
import { LiftingEquipmentReadingsModal } from "@/components/lifting-equipment/LiftingEquipmentReadingsModal";
import { LiftingEquipmentCertificateModal } from "@/components/lifting-equipment/LiftingEquipmentCertificateModal";

const LiftingEquipment = () => {
  const { customerId } = useParams();
  const [showReadingsModal, setShowReadingsModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
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

      return equipmentData.map(equipment => ({
        id: equipment.id,
        model: equipment.model || '',
        serialNumber: equipment.serial_number || '',
        lastServiceDate: equipment.last_service_date || '',
        nextServiceDue: equipment.next_service_due || ''
      }));
    }
  });

  const handleNewLiftingEquipment = () => {
    setSelectedEquipmentId(null);
    setShowReadingsModal(true);
  };

  const handleGenerateCertificate = (id: string) => {
    setSelectedEquipmentId(id);
    setShowCertificateModal(true);
  };

  const handleViewReadings = (id: string) => {
    setSelectedEquipmentId(id);
    setShowReadingsModal(true);
  };

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
          <LiftingEquipmentHeader
            customerId={customerId!}
            customerName={customerData?.name}
            onNewLiftingEquipment={handleNewLiftingEquipment}
          />
          
          <LiftingEquipmentList
            liftingEquipment={liftingEquipment}
            onNewLiftingEquipment={handleNewLiftingEquipment}
            onGenerateCertificate={handleGenerateCertificate}
            onViewReadings={handleViewReadings}
          />
        </div>
      </main>

      <LiftingEquipmentReadingsModal
        open={showReadingsModal}
        onOpenChange={setShowReadingsModal}
        equipmentId={selectedEquipmentId}
      />

      <LiftingEquipmentCertificateModal
        open={showCertificateModal}
        onOpenChange={setShowCertificateModal}
        equipmentId={selectedEquipmentId}
      />
    </div>
  );
};

export default LiftingEquipment;