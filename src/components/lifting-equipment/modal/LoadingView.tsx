import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ModalHeader } from "./ModalHeader";

interface LoadingViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoadingView = ({ open, onOpenChange }: LoadingViewProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <ModalHeader />
        <div className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};