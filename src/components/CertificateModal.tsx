import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Printer } from "lucide-react";
import { CertificateTemplate } from "./CertificateTemplate";
import { Certificate, Equipment, ServiceRecord } from "@/types/equipment";
import { toast } from "sonner";

interface CertificateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificate: Certificate;
  equipment: Equipment;
  serviceRecord: ServiceRecord;
}

export const CertificateModal = ({
  open,
  onOpenChange,
  certificate,
  equipment,
  serviceRecord,
}: CertificateModalProps) => {
  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    // This would be connected to your email service
    toast.success("Email functionality will be implemented soon");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[210mm] min-h-[297mm] p-8 bg-white">
        <div className="flex justify-end gap-4 mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleEmail}
            className="h-10 w-10"
          >
            <Mail className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrint}
            className="h-10 w-10"
          >
            <Printer className="h-5 w-5" />
          </Button>
        </div>
        
        <CertificateTemplate
          certificate={certificate}
          equipment={equipment}
          serviceRecord={serviceRecord}
        />
      </DialogContent>
    </Dialog>
  );
};