import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
          {customerName && (
            <h1 className="text-3xl font-bold">
              {customerName}
            </h1>
          )}
          <Button 
            onClick={onNewTyreGauge}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Tyre Gauge
          </Button>
        </div>
      </div>
    </div>
  );
};