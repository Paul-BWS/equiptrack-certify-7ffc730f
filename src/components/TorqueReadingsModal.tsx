import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { TorqueWrench } from "@/types/equipment";
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
      <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-[#FFFFFF]">
        <DialogHeader>
          <DialogTitle>Torque Wrench Readings</DialogTitle>
          <DialogDescription>
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