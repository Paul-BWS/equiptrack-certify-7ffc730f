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
          <div className="flex items-center gap-4">
          </div>
          <Button 
            onClick={onNewTyreGauge}
            className="rounded-md bg-white text-primary border border-primary/50 hover:bg-primary/10 px-6 py-2"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            <span className="ml-1">New Tyre</span>
          </Button>
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