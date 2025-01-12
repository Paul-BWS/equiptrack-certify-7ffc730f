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
      console.log('Fetching torque wrenches for customer:', customerId);
      
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

      console.log('Fetched torque wrenches:', equipmentData);
      
      return equipmentData.map(wrench => ({
        id: wrench.id,
        model: wrench.model || '',
        serialNumber: wrench.serial_number || '',
        lastServiceDate: wrench.last_service_date || '',
        nextServiceDue: wrench.next_service_due || ''
      }));
    },
    meta: {
      onError: (error: Error) => {
        console.error('Query error:', error);
        toast.error("Could not load torque wrench data. Please try again later.");
      }
    }
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
          />
        </div>
      </main>

      <TorqueReadingsModal
        open={showReadingsModal}
        onOpenChange={setShowReadingsModal}
        equipmentId={selectedEquipmentId}
      />

      {selectedEquipmentId && (
        <CertificateModal
          open={showCertificateModal}
          onOpenChange={setShowCertificateModal}
          certificate={{
            id: "",
            torque_wrench_id: selectedEquipmentId,
            certification_number: "",
            issue_date: new Date().toISOString(),
            expiry_date: new Date().toISOString()
          }}
          equipment={{} as any}
          serviceRecord={{} as any}
        />
      )}
    </div>
  );
};

export default TorqueWrenches;