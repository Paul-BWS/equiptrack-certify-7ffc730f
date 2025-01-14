import { CustomerHeader } from "./CustomerHeader";
import { NewTyreButton } from "./NewTyreButton";

interface TyreGaugeHeaderProps {
  customerId: string;
  customerName?: string;
  onNewTyreGauge: () => void;
}

export const TyreGaugeHeader = ({
  customerId,
  customerName,
  onNewTyreGauge,
}: TyreGaugeHeaderProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
          </div>
          <NewTyreButton onClick={onNewTyreGauge} />
        </div>
        <CustomerHeader customerName={customerName} />
      </div>
    </div>
  );
};