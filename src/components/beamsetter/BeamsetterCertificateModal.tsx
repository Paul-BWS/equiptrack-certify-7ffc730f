import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { CertificateActions } from "@/components/certificate/CertificateActions";
import { handleCertificatePrint } from "@/utils/certificateUtils";
import { toast } from "sonner";
import { BeamsetterCertificateTemplate } from "./certificate/BeamsetterCertificateTemplate";

interface BeamsetterCertificateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipment: any;
}

export const BeamsetterCertificateModal = ({
  open,
  onOpenChange,
  equipment,
}: BeamsetterCertificateModalProps) => {
  const handlePrint = () => {
    handleCertificatePrint(equipment.cert_number);
  };

  const handleEmail = () => {
    toast.success("Certificate email functionality coming soon");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] h-[90vh] p-4 overflow-auto bg-white print:p-0">
        <div className="no-print">
          <CertificateActions
            onClose={() => onOpenChange(false)}
            onEmail={handleEmail}
            onPrint={handlePrint}
          />
        </div>
        
        <BeamsetterCertificateTemplate equipment={equipment} />
      </DialogContent>
    </Dialog>
  );
};