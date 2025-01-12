import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TorqueWrench } from "@/types/equipment";
import { EquipmentList } from "@/components/EquipmentList";

interface TorqueWrenchListProps {
  torqueWrenches: Array<{
    id: string;
    model: string;
    serialNumber: string;
    lastServiceDate: string;
    nextServiceDue: string;
  }>;
  onNewTorqueWrench: () => void;
  onGenerateCertificate: (id: string) => void;
  onViewReadings: (id: string) => void;
}

export const TorqueWrenchList = ({
  torqueWrenches,
  onNewTorqueWrench,
  onGenerateCertificate,
  onViewReadings,
}: TorqueWrenchListProps) => {
  if (torqueWrenches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
        <p className="text-muted-foreground mb-4">No torque wrenches found for this customer.</p>
        <Button 
          onClick={onNewTorqueWrench}
          className="bg-primary hover:bg-primary/90"
        >
          Add First Torque Wrench
        </Button>
      </div>
    );
  }

  return (
    <EquipmentList
      equipment={torqueWrenches}
      onGenerateCertificate={onGenerateCertificate}
      onViewReadings={onViewReadings}
    />
  );
};