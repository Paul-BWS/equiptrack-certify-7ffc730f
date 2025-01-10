import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { EquipmentList } from "@/components/EquipmentList";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TorqueReadingsModal } from "@/components/TorqueReadingsModal";

const TorqueWrenches = () => {
  const navigate = useNavigate();
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
          <Button
            variant="outline"
            className="mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Equipment
          </Button>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Torque Wrenches
              </h1>
              <p className="text-muted-foreground">
                Manage and calibrate torque wrenches
              </p>
            </div>
            <Button onClick={() => setShowReadingsModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Torque
            </Button>
          </div>
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