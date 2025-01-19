import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface NewAxleStandButtonProps {
  onClick: () => void;
}

export const NewAxleStandButton = ({ onClick }: NewAxleStandButtonProps) => {
  return (
    <Button 
      onClick={onClick}
      className="rounded-md bg-white text-[#4c6fbf] border border-[#4c6fbf]/50 hover:bg-[#4c6fbf]/10 px-6 py-2"
    >
      <Plus className="h-4 w-4" strokeWidth={2} />
      <span className="ml-1">New Axle Stand</span>
    </Button>
  );
};