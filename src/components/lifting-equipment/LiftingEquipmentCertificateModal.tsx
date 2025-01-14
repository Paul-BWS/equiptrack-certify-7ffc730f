import { Dialog } from "@/components/ui/dialog";
import { CertificateTemplate } from "./certificate/CertificateTemplate";

interface LiftingEquipmentCertificateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}

export const LiftingEquipmentCertificateModal = ({
  open,
  onOpenChange,
  equipmentId,
}: LiftingEquipmentCertificateModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <CertificateTemplate equipmentId={equipmentId} onClose={() => onOpenChange(false)} />
    </Dialog>
  );
};