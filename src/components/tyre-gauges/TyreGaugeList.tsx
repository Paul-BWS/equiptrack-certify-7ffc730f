import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EquipmentList } from "@/components/EquipmentList";
import { useProfileData } from "@/hooks/useProfileData";

interface TyreGaugeListProps {
  tyreGauges: Array<{
    id: string;
    model: string;
    serialNumber: string;
    lastServiceDate: string;
    nextServiceDue: string;
  }>;
  onNewTyreGauge: () => void;
  onGenerateCertificate: (id: string) => void;
  onViewReadings: (id: string) => void;
}

export const TyreGaugeList = ({
  tyreGauges,
  onNewTyreGauge,
  onGenerateCertificate,
  onViewReadings,
}: TyreGaugeListProps) => {
  const { isBWSUser } = useProfileData();
  
  const handleNewTyreGauge = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onNewTyreGauge();
  };

  if (tyreGauges.length === 0 && isBWSUser) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
        <p className="text-muted-foreground mb-4">No tyre gauges found for this customer.</p>
        <Button 
          onClick={handleNewTyreGauge}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add First Tyre Gauge
        </Button>
      </div>
    );
  }

  if (tyreGauges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
        <p className="text-muted-foreground mb-4">No tyre gauges found for this customer.</p>
      </div>
    );
  }

  return (
    <EquipmentList
      equipment={tyreGauges}
      onGenerateCertificate={onGenerateCertificate}
      onViewReadings={onViewReadings}
    />
  );
};