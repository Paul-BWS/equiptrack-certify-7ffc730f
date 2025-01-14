import { CustomerHeader } from "../tyre-gauges/CustomerHeader";
import { NewAxleStandButton } from "./NewAxleStandButton";

interface AxleStandsHeaderProps {
  customerId: string;
  customerName?: string;
  onNewAxleStand: () => void;
}

export const AxleStandsHeader = ({
  customerId,
  customerName,
  onNewAxleStand,
}: AxleStandsHeaderProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
          </div>
          <NewAxleStandButton onClick={onNewAxleStand} />
        </div>
        <CustomerHeader customerName={customerName} />
      </div>
    </div>
  );
};