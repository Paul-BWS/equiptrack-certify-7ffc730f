import { CustomerHeader } from "../tyre-gauges/CustomerHeader";
import { NewLiftingButton } from "./NewLiftingButton";

interface LiftingEquipmentHeaderProps {
  customerId: string;
  customerName?: string;
  onNewLiftingEquipment: () => void;
}

export const LiftingEquipmentHeader = ({
  customerId,
  customerName,
  onNewLiftingEquipment,
}: LiftingEquipmentHeaderProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
          </div>
          <NewLiftingButton onClick={onNewLiftingEquipment} />
        </div>
        <CustomerHeader customerName={customerName} />
      </div>
    </div>
  );
};