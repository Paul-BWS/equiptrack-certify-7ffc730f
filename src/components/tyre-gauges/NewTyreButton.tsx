import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface NewTyreButtonProps {
  onClick: () => void;
}

export const NewTyreButton = ({ onClick }: NewTyreButtonProps) => {
  return (
    <Button 
      onClick={onClick}
      className="bg-[#7b96d4] text-white hover:bg-[#4c6fbf] px-6 py-2"
    >
      <Plus className="h-4 w-4 text-white" strokeWidth={2} />
      <span className="ml-1">New Tyre</span>
    </Button>
  );
};