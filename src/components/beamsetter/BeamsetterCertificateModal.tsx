import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BeamsetterCertificateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipment: any; // We'll type this properly later
}

export const BeamsetterCertificateModal = ({
  open,
  onOpenChange,
  equipment,
}: BeamsetterCertificateModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Beamsetter Certificate</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p className="text-muted-foreground">
            Certificate generation implementation coming soon...
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};