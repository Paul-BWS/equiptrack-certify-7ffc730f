import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EquipmentList } from "@/components/EquipmentList";
import { useProfileData } from "@/hooks/useProfileData";

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
  const { isBWSUser } = useProfileData();
  
  const handleNewLiftingEquipment = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onNewLiftingEquipment();
  };

  if (liftingEquipment.length === 0 && isBWSUser) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
        <p className="text-muted-foreground mb-4">No lifting equipment found for this customer.</p>
        <Button 
          onClick={handleNewLiftingEquipment}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add First Lifting Equipment
        </Button>
      </div>
    );
  }

  if (liftingEquipment.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
        <p className="text-muted-foreground mb-4">No lifting equipment found for this customer.</p>
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