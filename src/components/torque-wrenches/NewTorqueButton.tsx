import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface NewTorqueButtonProps {
  onClick: () => void;
}

export const NewTorqueButton = ({ onClick }: NewTorqueButtonProps) => {
  return (
    <Button 
      onClick={onClick}
      className="bg-[#7b96d4] text-white hover:bg-[#4c6fbf] w-full md:w-auto"
    >
      <Plus className="h-4 w-4 text-white" strokeWidth={2} />
      <span className="ml-1">New Torque Wrench</span>
    </Button>
  );
};