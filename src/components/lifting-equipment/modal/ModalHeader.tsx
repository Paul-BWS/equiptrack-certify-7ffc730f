import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const ModalHeader = () => {
  return (
    <DialogHeader className="p-6 border-b">
      <DialogTitle className="text-xl font-semibold">Lifting Equipment Readings</DialogTitle>
    </DialogHeader>
  );
};