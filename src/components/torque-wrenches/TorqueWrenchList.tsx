import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EquipmentList } from "@/components/EquipmentList";
import { useProfileData } from "@/hooks/useProfileData";

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
  const { isBWSUser } = useProfileData();

  if (!torqueWrenches.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No torque wrench equipment found</h3>
        <p className="text-muted-foreground mb-4">
          {isBWSUser 
            ? "Get started by adding your first torque wrench equipment."
            : "No torque wrench equipment has been added yet."}
        </p>
        {isBWSUser && (
          <button
            onClick={onNewTorqueWrench}
            className="text-primary hover:underline"
          >
            Add Torque Wrench
          </button>
        )}
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