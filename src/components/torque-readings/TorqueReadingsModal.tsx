import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TorqueWrench } from "@/types/equipment";
import { TorqueReadingsForm } from "./TorqueReadingsForm";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import { LoadingState } from "./LoadingState";
import { toast } from "sonner";
import { X } from "lucide-react";

interface TorqueReadingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}

export const TorqueReadingsModal = ({
  open,
  onOpenChange,
  equipmentId,
}: TorqueReadingsModalProps) => {
  const { data: equipment, isLoading, error } = useEquipmentData(equipmentId, open);

  if (error) {
    toast.error("Failed to load equipment data");
    return null;
  }

  if (isLoading) {
    return <LoadingState open={open} onOpenChange={onOpenChange} />;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white p-6">
        <DialogHeader className="flex flex-row items-center justify-between mb-6">
          <DialogTitle className="text-xl font-semibold text-black">Torque Wrench Readings</DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <TorqueReadingsForm
          equipment={equipment}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};