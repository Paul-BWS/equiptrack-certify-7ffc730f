import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CertificateActions } from "./certificate/CertificateActions";
import { CertificateContent } from "./certificate/CertificateContent";
import { Certificate, TorqueWrench, ServiceRecord } from "@/types/equipment";
import { handleCertificatePrint } from "@/utils/certificateUtils";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface CertificateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificate: Certificate;
  equipment: TorqueWrench;
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
    handleCertificatePrint(certificate.certification_number);
  };

  const handleEmail = async () => {
    try {
      if (!equipment.id) {
        throw new Error('Equipment ID is required');
      }

      const { data: existingCert, error: certError } = await supabase
        .from('certificates')
        .select('*')
        .eq('torque_wrench_id', equipment.id)
        .single();

      if (certError && certError.code !== 'PGRST116') {
        console.error('Error checking existing certificate:', certError);
        throw new Error('Failed to check existing certificate');
      }

      if (existingCert) {
        toast.error('Certificate already exists for this equipment');
        return;
      }

      if (!certificate.issue_date) {
        throw new Error('Issue date is required');
      }
      if (!certificate.expiry_date) {
        throw new Error('Expiry date is required');
      }

      const certificateData = {
        torque_wrench_id: equipment.id,
        certification_number: certificate.certification_number,
        issue_date: new Date(certificate.issue_date).toISOString(),
        expiry_date: new Date(certificate.expiry_date).toISOString()
      };

      console.log('Inserting certificate with data:', certificateData);

      const { error } = await supabase
        .from('certificates')
        .insert([certificateData]);

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      toast.success(`Certificate ${certificate.certification_number} created successfully`, {
        description: `For: ${equipment.model} (${equipment.serial_number})`,
      });
    } catch (error: any) {
      console.error('Error in handleEmail:', error);
      toast.error(error.message || "Failed to create certificate");
    }
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
        
        <CertificateContent
          certificate={certificate}
          equipment={equipment}
          serviceRecord={serviceRecord}
        />
      </DialogContent>
    </Dialog>
  );
};