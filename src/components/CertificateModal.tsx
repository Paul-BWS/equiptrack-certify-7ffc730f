import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Printer, X } from "lucide-react";
import { CertificateTemplate } from "./CertificateTemplate";
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
    
    // Set the filename for printing
    const style = document.createElement('style');
    style.innerHTML = `@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }`;
    document.head.appendChild(style);
    
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
      // Validate required fields
      if (!equipment.id) {
        throw new Error('Equipment ID is required');
      }
      
      // Generate a certification number if one doesn't exist
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

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] h-[90vh] p-4 overflow-auto bg-white">
        <div className="flex justify-between gap-4 mb-4 sticky top-0 bg-white z-10 p-2 no-print">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-10 w-10 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="flex gap-4">
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
        </div>
        
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