import { Dialog, DialogContent } from "@/components/ui/dialog";

interface LoadingStateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoadingState = ({ open, onOpenChange }: LoadingStateProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};