import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { EquipmentList } from "@/components/EquipmentList";
import { Button } from "@/components/ui/button";
import { Plus, Grid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TorqueReadingsModal } from "@/components/TorqueReadingsModal";
import { useIsMobile } from "@/hooks/use-mobile";

const TorqueWrenches = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showReadingsModal, setShowReadingsModal] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);

  // Sample data - replace with actual data fetching
  const equipment = [
    {
      id: "1",
      name: "Silver (red handle)",
      serialNumber: "TW01",
      lastServiceDate: "08/01/2025",
      nextServiceDue: "07/01/2026",
      manufacturer: "Torqueleader",
      model: "34TSRL",
      purchaseDate: "01/01/2024",
    },
  ];

  const handleGenerateCertificate = (equipmentId: string) => {
    setSelectedEquipmentId(equipmentId);
    setShowReadingsModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <div className="flex flex-row justify-between items-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <Grid className="h-5 w-5 text-[#1D4ED8]" strokeWidth={2.5} />
              {!isMobile && "Back to Equipment"}
            </Button>
            
            <Button 
              onClick={() => setShowReadingsModal(true)}
              className="bg-[#1D4ED8] hover:bg-[#1D4ED8]/90 gap-2"
            >
              <Plus className="h-5 w-5" strokeWidth={2.5} />
              {!isMobile && "Add Torque"}
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Torque Wrenches
          </h1>
        </div>

        <EquipmentList 
          equipment={equipment}
          onGenerateCertificate={handleGenerateCertificate}
        />

        <TorqueReadingsModal
          open={showReadingsModal}
          onOpenChange={setShowReadingsModal}
          equipmentId={selectedEquipmentId}
        />
      </main>
    </div>
  );
};

export default TorqueWrenches;