import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BeamsetterReadingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}

export const BeamsetterReadingsModal = ({
  open,
  onOpenChange,
  equipmentId,
}: BeamsetterReadingsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {equipmentId ? "Edit Beamsetter" : "Add New Beamsetter"}
          </DialogTitle>
        </DialogHeader>
        {/* Form will be added in future implementation */}
        <div className="p-4">
          <p className="text-muted-foreground">
            Beamsetter form implementation coming soon...
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};