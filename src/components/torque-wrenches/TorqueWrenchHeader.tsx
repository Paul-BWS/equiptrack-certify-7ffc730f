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
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
          </div>
          <NewTorqueButton onClick={onNewTorqueWrench} />
        </div>
        {customerName && (
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">
              {customerName}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};