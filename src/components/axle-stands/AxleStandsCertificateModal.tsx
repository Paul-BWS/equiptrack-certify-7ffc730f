import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CertificateActions } from "@/components/certificate/CertificateActions";
import { CertificateContent } from "@/components/certificate/CertificateContent";
import { handleCertificatePrint } from "@/utils/certificateUtils";
import { toast } from "sonner";

interface AxleStandsCertificateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipment: any;
}

export const AxleStandsCertificateModal = ({
  open,
  onOpenChange,
  equipment,
}: AxleStandsCertificateModalProps) => {
  const handlePrint = () => {
    handleCertificatePrint(equipment.cert_number);
  };

  const handleEmail = () => {
    toast.success("Certificate email functionality coming soon");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1000px] max-h-[90vh] overflow-y-auto p-0">
        <div className="p-6">
          <CertificateActions
            onClose={() => onOpenChange(false)}
            onEmail={handleEmail}
            onPrint={handlePrint}
          />
          <CertificateContent
            certificate={{
              id: equipment.id,
              certification_number: equipment.cert_number,
              issue_date: equipment.last_service_date,
              expiry_date: equipment.next_service_due,
            }}
            equipment={{
              id: equipment.id,
              company_id: equipment.company_id,
              model: equipment.model,
              serial_number: equipment.serial_number,
              last_service_date: equipment.last_service_date,
              next_service_due: equipment.next_service_due,
            }}
            serviceRecord={{
              id: equipment.id,
              equipment_id: equipment.id,
              service_date: equipment.last_service_date,
              service_type: "Inspection",
              technician: equipment.engineer,
              notes: equipment.notes,
              next_service_date: equipment.next_service_due,
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};