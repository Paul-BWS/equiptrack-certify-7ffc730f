import { Dialog, DialogContent } from "@/components/ui/dialog";

interface LoadingViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoadingView = ({ open, onOpenChange }: LoadingViewProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white p-0">
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};