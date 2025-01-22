import { useProfileData } from "@/hooks/useProfileData";
import { NewTorqueButton } from "./NewTorqueButton";

interface TorqueWrenchHeaderProps {
  customerId: string;
  customerName?: string;
  onNewTorqueWrench: () => void;
}

export const TorqueWrenchHeader = ({
  customerId,
  customerName,
  onNewTorqueWrench,
}: TorqueWrenchHeaderProps) => {
  const { isBWSUser } = useProfileData();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Torque Wrenches</h1>
        {customerName && (
          <p className="text-muted-foreground">
            Viewing torque wrenches for {customerName}
          </p>
        )}
      </div>
      {isBWSUser && (
        <NewTorqueButton onClick={onNewTorqueWrench} />
      )}
    </div>
  );
};