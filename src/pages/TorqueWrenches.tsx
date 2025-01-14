import { Navigation } from "@/components/Navigation";
import { TorqueReadingsModal } from "@/components/TorqueReadingsModal";
import { CertificateModal } from "@/components/CertificateModal";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { TorqueWrenchHeader } from "@/components/torque-wrenches/TorqueWrenchHeader";
import { TorqueWrenchList } from "@/components/torque-wrenches/TorqueWrenchList";

const TorqueWrenches = () => {
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

  const { data: torqueWrenches = [], isLoading } = useQuery({
    queryKey: ['equipment', customerId, 'torque-wrenches'],
    queryFn: async () => {
      const { data: equipmentData, error } = await supabase
        .from('torque_wrench')
        .select('*')
        .eq('company_id', customerId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching torque wrenches:', error);
        toast.error("Failed to load torque wrench data");
        throw error;
      }

      return equipmentData.map(wrench => ({
        id: wrench.id,
        model: wrench.model || '',
        serial_number: wrench.serial_number || '',
        last_service_date: wrench.last_service_date || '',
        next_service_due: wrench.next_service_due || ''
      }));
    }
  });

  const { data: selectedEquipment } = useQuery({
    queryKey: ['equipment', selectedEquipmentId],
    queryFn: async () => {
      if (!selectedEquipmentId) return null;
      
      const { data, error } = await supabase
        .from('torque_wrench')
        .select('*')
        .eq('id', selectedEquipmentId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!selectedEquipmentId && showCertificateModal
  });

  const { data: latestCertificate } = useQuery({
    queryKey: ['certificate', selectedEquipmentId],
    queryFn: async () => {
      if (!selectedEquipmentId) return null;
      
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('torque_wrench_id', selectedEquipmentId)
        .order('issue_date', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        // If no certificate exists, return a default one
        if (error.code === 'PGRST116') {
          return {
            id: crypto.randomUUID(),
            torque_wrench_id: selectedEquipmentId,
            issue_date: new Date().toISOString(),
            certification_number: `BWS-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
          };
        }
        throw error;
      }
      return data;
    },
    enabled: !!selectedEquipmentId && showCertificateModal
  });

  const handleNewTorqueWrench = () => {
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
          <TorqueWrenchHeader
            customerId={customerId!}
            customerName={customerData?.name}
            onNewTorqueWrench={handleNewTorqueWrench}
          />
          
          <TorqueWrenchList
            torqueWrenches={torqueWrenches}
            onNewTorqueWrench={handleNewTorqueWrench}
            onGenerateCertificate={handleGenerateCertificate}
            onViewReadings={handleViewReadings}
          />
        </div>
      </main>

      <TorqueReadingsModal
        open={showReadingsModal}
        onOpenChange={setShowReadingsModal}
        equipmentId={selectedEquipmentId}
      />

      {selectedEquipmentId && selectedEquipment && (
        <CertificateModal
          open={showCertificateModal}
          onOpenChange={setShowCertificateModal}
          certificate={latestCertificate || {
            id: "",
            torque_wrench_id: selectedEquipmentId,
            certification_number: `BWS-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            issue_date: new Date().toISOString(),
            expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
          }}
          equipment={{
            id: selectedEquipment.id,
            model: selectedEquipment.model || '',
            serial_number: selectedEquipment.serial_number || '',
            last_service_date: selectedEquipment.last_service_date || '',
            next_service_due: selectedEquipment.next_service_due || '',
          }}
          serviceRecord={{
            id: crypto.randomUUID(),
            torque_wrench_id: selectedEquipmentId,
            service_date: selectedEquipment.last_service_date || new Date().toISOString(),
            service_type: 'calibration',
            technician: selectedEquipment.engineer || 'Default Technician',
            notes: selectedEquipment.notes || '',
            next_service_date: selectedEquipment.next_service_due || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
          }}
        />
      )}
    </div>
  );
};

export default TorqueWrenches;
