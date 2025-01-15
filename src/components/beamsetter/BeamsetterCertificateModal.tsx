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
      <DialogContent className="max-w-[210mm] min-h-[297mm] p-0 overflow-auto bg-white print:shadow-none print:min-h-0">
        <div className="sticky top-0 z-50 bg-white p-4 border-b no-print">
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