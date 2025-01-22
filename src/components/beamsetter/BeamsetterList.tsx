import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EquipmentList } from "@/components/EquipmentList";
import { useProfileData } from "@/hooks/useProfileData";

interface BeamsetterListProps {
  beamsetters: Array<{
    id: string;
    model: string;
    serialNumber: string;
    lastServiceDate: string;
    nextServiceDue: string;
  }>;
  onNewBeamsetter: () => void;
  onGenerateCertificate: (id: string) => void;
  onViewReadings: (id: string) => void;
}

export const BeamsetterList = ({
  beamsetters,
  onNewBeamsetter,
  onGenerateCertificate,
  onViewReadings,
}: BeamsetterListProps) => {
  const { isBWSUser } = useProfileData();
  
  const handleNewBeamsetter = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onNewBeamsetter();
  };

  if (beamsetters.length === 0 && isBWSUser) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
        <p className="text-muted-foreground mb-4">No beamsetters found for this customer.</p>
        <Button 
          onClick={handleNewBeamsetter}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add First Beamsetter
        </Button>
      </div>
    );
  }

  if (beamsetters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
        <p className="text-muted-foreground mb-4">No beamsetters found for this customer.</p>
      </div>
    );
  }

  return (
    <EquipmentList
      equipment={beamsetters}
      onGenerateCertificate={onGenerateCertificate}
      onViewReadings={onViewReadings}
    />
  );
};