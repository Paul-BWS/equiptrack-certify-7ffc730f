import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EquipmentList } from "@/components/EquipmentList";
import { useProfileData } from "@/hooks/useProfileData";

interface AxleStandsListProps {
  axleStands: Array<{
    id: string;
    model: string;
    serialNumber: string;
    lastServiceDate: string;
    nextServiceDue: string;
  }>;
  onNewAxleStand: () => void;
  onGenerateCertificate: (id: string) => void;
  onViewReadings: (id: string) => void;
}

export const AxleStandsList = ({
  axleStands,
  onNewAxleStand,
  onGenerateCertificate,
  onViewReadings,
}: AxleStandsListProps) => {
  const { isBWSUser } = useProfileData();
  
  const handleNewAxleStand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onNewAxleStand();
  };

  if (axleStands.length === 0 && isBWSUser) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
        <p className="text-muted-foreground mb-4">No axle stands found for this customer.</p>
        <Button 
          onClick={handleNewAxleStand}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add First Axle Stand
        </Button>
      </div>
    );
  }

  if (axleStands.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
        <p className="text-muted-foreground mb-4">No axle stands found for this customer.</p>
      </div>
    );
  }

  return (
    <EquipmentList
      equipment={axleStands}
      onGenerateCertificate={onGenerateCertificate}
      onViewReadings={onViewReadings}
    />
  );
};