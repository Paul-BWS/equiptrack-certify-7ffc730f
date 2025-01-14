import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CertificateTemplate } from "./CertificateTemplate";
import { CertificateActions } from "./certificate/CertificateActions";
import { Certificate, TorqueWrench, ServiceRecord } from "@/types/equipment";
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
    const timestamp = new Date().toISOString();
    console.log("Certificate printed on:", timestamp);
    
    // Set the filename for printing and clean print styles
    const style = document.createElement('style');
    style.innerHTML = `
      @page { 
        size: auto; 
        margin: 0mm; 
      } 
      @media print { 
        body { 
          -webkit-print-color-adjust: exact;
        }
        .no-print {
          display: none !important;
        }
        #certificate {
          padding: 20px;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Set document title for filename
    const originalTitle = document.title;
    document.title = `${certificate.certification_number}`;
    
    window.print();
    
    // Clean up
    document.head.removeChild(style);
    document.title = originalTitle;
    
    toast.success(`Certificate ${certificate.certification_number} printed at ${new Date(timestamp).toLocaleString()}`);
  };

  const handleEmail = async () => {
    try {
      if (!equipment.id) {
        throw new Error('Equipment ID is required');
      }
      
      const certificationNumber = `BWS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      if (!certificate.issue_date) {
        throw new Error('Issue date is required');
      }
      if (!certificate.expiry_date) {
        throw new Error('Expiry date is required');
      }

      const certificateData = {
        id: crypto.randomUUID(),
        torque_wrench_id: equipment.id,
        certification_number: certificationNumber,
        issue_date: new Date(certificate.issue_date).toISOString(),
        expiry_date: new Date(certificate.expiry_date).toISOString()
      };

      console.log('Attempting to save certificate with data:', certificateData);

      const { data, error } = await supabase
        .from('certificates')
        .insert([certificateData])
        .select('*')
        .single();

      if (error) {
        console.error('Database error:', error);
        throw new Error(error.message);
      }

      console.log("Certificate saved successfully:", data);
      toast.success(`Email sent successfully for certificate ${certificationNumber}`, {
        description: `To: ${equipment.model} (${equipment.serial_number})`,
      });
    } catch (error: any) {
      console.error('Error in handleEmail:', error);
      toast.error(error.message || "Failed to send certificate email");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] h-[90vh] p-4 overflow-auto bg-white">
        <CertificateActions
          onClose={() => onOpenChange(false)}
          onEmail={handleEmail}
          onPrint={handlePrint}
        />
        
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <CertificateTemplate
              certificate={certificate}
              equipment={equipment}
              serviceRecord={serviceRecord}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};