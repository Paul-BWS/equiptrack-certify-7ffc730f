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
        {customerName && (
          <h1 className="text-2xl font-bold">
            {customerName}
          </h1>
        )}
      </div>
      {isBWSUser && (
        <NewTorqueButton onClick={onNewTorqueWrench} />
      )}
    </div>
  );
};