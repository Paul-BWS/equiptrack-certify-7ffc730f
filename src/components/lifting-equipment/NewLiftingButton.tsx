import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface NewLiftingButtonProps {
  onClick: () => void;
}

export const NewLiftingButton = ({ onClick }: NewLiftingButtonProps) => {
  return (
    <Button 
      onClick={onClick}
      className="rounded-md bg-white text-primary border border-primary/50 hover:bg-primary/10 px-6 py-2"
    >
      <Plus className="h-4 w-4" strokeWidth={2} />
      <span className="ml-1">New Lifting Equipment</span>
    </Button>
  );
};