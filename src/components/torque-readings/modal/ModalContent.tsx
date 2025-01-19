import { DialogContent } from "@/components/ui/dialog";
import { useModalForm } from "@/hooks/useModalForm";
import { LoadingView } from "./LoadingView";
import { ModalForm } from "./ModalForm";
import { useEquipmentData } from "@/hooks/useEquipmentData";

interface ModalContentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}

export const ModalContent = ({
  open,
  onOpenChange,
  equipmentId,
}: ModalContentProps) => {
  const { data: equipment, isLoading } = useEquipmentData(equipmentId, open);
  const { readings, setReadings, handleSubmit, isSaving } = useModalForm(
    equipmentId,
    () => onOpenChange(false)
  );

  if (isLoading && equipmentId) {
    return <LoadingView />;
  }

  return (
    <DialogContent className="max-w-3xl bg-white">
      <ModalForm
        readings={readings}
        setReadings={setReadings}
        onSubmit={handleSubmit}
        onClose={() => onOpenChange(false)}
        isSaving={isSaving}
        equipmentId={equipmentId}
      />
    </DialogContent>
  );
};