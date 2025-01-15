import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BeamsetterHeaderProps {
  customerId: string;
  customerName?: string;
  onNewBeamsetter: () => void;
}

export const BeamsetterHeader = ({
  customerId,
  customerName,
  onNewBeamsetter,
}: BeamsetterHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/customers/${customerId}/equipment`)}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Equipment
          </button>
          <span className="text-sm text-muted-foreground">/</span>
          <span className="text-sm">Beamsetter</span>
        </div>
        <h1 className="text-2xl font-bold mt-1">
          {customerName ? `${customerName} - Beamsetter` : 'Beamsetter'}
        </h1>
      </div>
      <Button onClick={onNewBeamsetter} className="w-full md:w-auto">
        <Plus className="h-4 w-4 mr-2" />
        Add Beamsetter
      </Button>
    </div>
  );
};