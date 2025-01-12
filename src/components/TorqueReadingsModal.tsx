import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TorqueReadingsForm } from "./torque-readings/TorqueReadingsForm";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import { LoadingState } from "./torque-readings/LoadingState";
import { toast } from "sonner";

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
      <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Torque Wrench Readings</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            View and edit torque wrench readings
          </DialogDescription>
        </DialogHeader>
        
        <TorqueReadingsForm
          equipment={equipment}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};