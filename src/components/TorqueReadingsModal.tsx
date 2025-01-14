import { Dialog } from "@/components/ui/dialog";
import { ModalContent } from "./torque-readings/modal/ModalContent";

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