import { BeamsetterLayout } from "@/components/layouts/BeamsetterLayout";
import { BeamsetterReadingsModal } from "@/components/beamsetter/BeamsetterReadingsModal";
import { BeamsetterCertificateModal } from "@/components/beamsetter/BeamsetterCertificateModal";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { BeamsetterHeader } from "@/components/beamsetter/BeamsetterHeader";
import { BeamsetterList } from "@/components/beamsetter/BeamsetterList";

const Beamsetter = () => {
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

  const { data: beamsetters = [], isLoading } = useQuery({
    queryKey: ['equipment', customerId, 'beamsetter'],
    queryFn: async () => {
      const { data: equipmentData, error } = await supabase
        .from('beamsetter')
        .select('*')
        .eq('company_id', customerId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching beamsetters:', error);
        toast.error("Failed to load beamsetter data");
        throw error;
      }

      return equipmentData.map(beamsetter => ({
        id: beamsetter.id,
        model: beamsetter.model || '',
        serialNumber: beamsetter.serial_number || '',
        lastServiceDate: beamsetter.last_service_date || '',
        nextServiceDue: beamsetter.next_service_due || ''
      }));
    }
  });

  const { data: selectedEquipment } = useQuery({
    queryKey: ['equipment', selectedEquipmentId],
    queryFn: async () => {
      if (!selectedEquipmentId) return null;
      
      const { data, error } = await supabase
        .from('beamsetter')
        .select('*')
        .eq('id', selectedEquipmentId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!selectedEquipmentId && showCertificateModal
  });

  const handleNewBeamsetter = () => {
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
      <BeamsetterLayout>
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </BeamsetterLayout>
    );
  }

  return (
    <BeamsetterLayout>
      <div className="space-y-6">
        <BeamsetterHeader
          customerId={customerId!}
          customerName={customerData?.name}
          onNewBeamsetter={handleNewBeamsetter}
        />
        
        <BeamsetterList
          beamsetters={beamsetters}
          onNewBeamsetter={handleNewBeamsetter}
          onGenerateCertificate={handleGenerateCertificate}
          onViewReadings={handleViewReadings}
        />
      </div>

      <BeamsetterReadingsModal
        open={showReadingsModal}
        onOpenChange={setShowReadingsModal}
        equipmentId={selectedEquipmentId}
      />

      {selectedEquipmentId && selectedEquipment && (
        <BeamsetterCertificateModal
          open={showCertificateModal}
          onOpenChange={setShowCertificateModal}
          equipment={selectedEquipment}
        />
      )}
    </BeamsetterLayout>
  );
};

export default Beamsetter;