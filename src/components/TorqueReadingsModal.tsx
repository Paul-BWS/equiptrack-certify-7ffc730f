import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Toaster } from "@/components/ui/sonner";
import { X } from "lucide-react";
import { ModalContent } from "./torque-readings/modal/ModalContent";

interface TorqueReadingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}

export const TorqueReadingsModal = ({
  open,
  onOpenChange,
  equipmentId,
}: TorqueReadingsModalProps) => {
  return (
    <>
      <Toaster />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] h-[90vh] p-0 bg-white">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader className="p-6 border-b bg-white">
            <DialogTitle className="text-xl font-semibold">
              {equipmentId ? "Edit Torque Wrench" : "Add New Torque Wrench"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto h-[calc(90vh-8rem)]">
            <ModalContent
              open={open}
              onOpenChange={onOpenChange}
              equipmentId={equipmentId}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};