import { Navigation } from "@/components/Navigation";
import { TyreGaugeReadingsModal } from "@/components/TyreGaugeReadingsModal";
import { TyreGaugeCertificateModal } from "@/components/TyreGaugeCertificateModal";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { TyreGaugeHeader } from "@/components/tyre-gauges/TyreGaugeHeader";
import { TyreGaugeList } from "@/components/tyre-gauges/TyreGaugeList";

const TyreGauges = () => {
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

  const { data: tyreGauges = [], isLoading } = useQuery({
    queryKey: ['equipment', customerId, 'tyre-gauges'],
    queryFn: async () => {
      const { data: equipmentData, error } = await supabase
        .from('tyre_gauges')
        .select('*')
        .eq('company_id', customerId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tyre gauges:', error);
        toast.error("Failed to load tyre gauge data");
        throw error;
      }

      return equipmentData.map(gauge => ({
        id: gauge.id,
        model: gauge.model || '',
        serialNumber: gauge.serial_number || '',
        lastServiceDate: gauge.last_service_date || '',
        nextServiceDue: gauge.next_service_due || ''
      }));
    }
  });

  const { data: selectedEquipment } = useQuery({
    queryKey: ['equipment', selectedEquipmentId],
    queryFn: async () => {
      if (!selectedEquipmentId) return null;
      
      const { data, error } = await supabase
        .from('tyre_gauges')
        .select('*')
        .eq('id', selectedEquipmentId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!selectedEquipmentId && showCertificateModal
  });

  const handleNewTyreGauge = () => {
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
          <TyreGaugeHeader
            customerId={customerId!}
            customerName={customerData?.name}
            onNewTyreGauge={handleNewTyreGauge}
          />
          
          <TyreGaugeList
            tyreGauges={tyreGauges}
            onNewTyreGauge={handleNewTyreGauge}
            onGenerateCertificate={handleGenerateCertificate}
            onViewReadings={handleViewReadings}
          />
        </div>
      </main>

      <TyreGaugeReadingsModal
        open={showReadingsModal}
        onOpenChange={setShowReadingsModal}
        equipmentId={selectedEquipmentId}
      />

      {selectedEquipmentId && selectedEquipment && (
        <TyreGaugeCertificateModal
          open={showCertificateModal}
          onOpenChange={setShowCertificateModal}
          equipment={selectedEquipment}
        />
      )}
    </div>
  );
};

export default TyreGauges;