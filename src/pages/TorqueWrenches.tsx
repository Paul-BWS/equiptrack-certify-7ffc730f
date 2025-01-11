import { Navigation } from "@/components/Navigation";
import { EquipmentList } from "@/components/EquipmentList";
import { Button } from "@/components/ui/button";
import { Grid, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { TorqueReadingsModal } from "@/components/TorqueReadingsModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

// Sample data - in a real app, this would come from your backend
const sampleEquipment = [
  {
    id: "1",
    name: "Torque Wrench A",
    serialNumber: "TW-001",
    manufacturer: "TorcPro",
    model: "TP-100",
    lastServiceDate: "2023-01-15",
    nextServiceDue: "2024-01-15",
  },
  {
    id: "2",
    name: "Torque Wrench B",
    serialNumber: "TW-002",
    manufacturer: "TorcPro",
    model: "TP-200",
    lastServiceDate: "2023-02-20",
    nextServiceDue: "2024-02-20",
  },
];

const TorqueWrenches = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const isMobile = useIsMobile();
  const [showReadingsModal, setShowReadingsModal] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-8">
        <div className="space-y-6">
          <div className="flex flex-row justify-between items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(`/customers/${customerId}/equipment`)}
              className="rounded-full bg-primary hover:bg-primary/90"
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
          
          <EquipmentList
            equipment={sampleEquipment}
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
