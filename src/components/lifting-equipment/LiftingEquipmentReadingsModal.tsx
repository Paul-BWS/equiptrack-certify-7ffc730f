import { Dialog } from "@/components/ui/dialog";
import { ModalContent } from "./modal/ModalContent";

interface LiftingEquipmentReadingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}

export const LiftingEquipmentReadingsModal = ({
  open,
  onOpenChange,
  equipmentId,
}: LiftingEquipmentReadingsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <ModalContent
        open={open}
        onOpenChange={onOpenChange}
        equipmentId={equipmentId}
      />
    </Dialog>
  );
};