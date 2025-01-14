import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EquipmentList } from "@/components/EquipmentList";

interface LiftingEquipmentListProps {
  liftingEquipment: Array<{
    id: string;
    model: string;
    serialNumber: string;
    lastServiceDate: string;
    nextServiceDue: string;
  }>;
  onNewLiftingEquipment: () => void;
  onGenerateCertificate: (id: string) => void;
  onViewReadings: (id: string) => void;
}

export const LiftingEquipmentList = ({
  liftingEquipment,
  onNewLiftingEquipment,
  onGenerateCertificate,
  onViewReadings,
}: LiftingEquipmentListProps) => {
  const handleNewLiftingEquipment = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onNewLiftingEquipment();
  };

  if (liftingEquipment.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
        <p className="text-muted-foreground mb-4">No lifting equipment found for this customer.</p>
        <Button 
          onClick={handleNewLiftingEquipment}
          className="bg-primary hover:bg-primary/90"
        >
          Add First Lifting Equipment
        </Button>
      </div>
    );
  }

  return (
    <EquipmentList
      equipment={liftingEquipment}
      onGenerateCertificate={onGenerateCertificate}
      onViewReadings={onViewReadings}
    />
  );
};