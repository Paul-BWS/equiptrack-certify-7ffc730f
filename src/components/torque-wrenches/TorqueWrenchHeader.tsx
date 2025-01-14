import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
          </div>
          <Button 
            onClick={onNewTorqueWrench}
            className="rounded-md bg-white text-primary border border-primary/50 hover:bg-primary/10 px-6 py-2"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            <span className="ml-1">New Torque</span>
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