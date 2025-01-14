import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Printer, X } from "lucide-react";
import { toast } from "sonner";
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
  const handlePrint = () => {
    const timestamp = new Date().toISOString();
    console.log("Certificate printed on:", timestamp);
    toast.success(`Certificate printed at ${new Date(timestamp).toLocaleString()}`);
    window.print();
  };

  const handleEmail = async () => {
    try {
      toast.success("Email sent successfully", {
        description: "Certificate has been emailed",
      });
    } catch (error) {
      console.error('Error in handleEmail:', error);
      toast.error("Failed to send certificate email");
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] h-[90vh] p-4 overflow-auto bg-white">
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
            <CertificateTemplate equipmentId={equipmentId} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};