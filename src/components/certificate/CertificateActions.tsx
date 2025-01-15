import { Button } from "@/components/ui/button";
import { Mail, Printer, X } from "lucide-react";

interface CertificateActionsProps {
  onClose: () => void;
  onEmail: () => void;
  onPrint: () => void;
}

export const CertificateActions = ({
  onClose,
  onEmail,
  onPrint,
}: CertificateActionsProps) => {
  return (
    <div className="flex justify-between gap-4 mb-4 sticky top-0 bg-white z-10 p-2 no-print">
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="h-10 w-10 hover:bg-gray-100"
      >
        <X className="h-6 w-6" />
      </Button>
      <div className="flex gap-4 mr-auto ml-8">
        <Button
          variant="outline"
          size="icon"
          onClick={onEmail}
          className="h-10 w-10"
        >
          <Mail className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onPrint}
          className="h-10 w-10"
        >
          <Printer className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};