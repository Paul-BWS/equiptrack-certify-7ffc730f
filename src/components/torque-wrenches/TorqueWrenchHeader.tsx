import { Button } from "@/components/ui/button";
import { Grid, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(`/customers/${customerId}/equipment`)}
              className="rounded-full bg-white border-2 border-primary hover:bg-primary/10"
            >
              <Grid className="h-4 w-4 text-primary" strokeWidth={2} />
            </Button>
            <Button 
              onClick={onNewTorqueWrench}
              className="rounded-full bg-white border-2 border-primary hover:bg-primary/10 px-4"
            >
              <Plus className="h-4 w-4 text-primary" strokeWidth={2} />
              <span className="text-primary ml-1">(+ Torque)</span>
            </Button>
          </div>
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