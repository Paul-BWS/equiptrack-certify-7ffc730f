import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Toaster } from "@/components/ui/sonner";
import { BasicDetails } from "./readings-form/BasicDetails";
import { NotesSection } from "./readings-form/NotesSection";
import { FormActions } from "./readings-form/FormActions";
import { BeamsetterModalProps } from "@/types/beamsetter-form";
import { useBeamsetterForm } from "@/hooks/useBeamsetterForm";

export const BeamsetterReadingsModal = ({
  open,
  onOpenChange,
  equipmentId,
}: BeamsetterModalProps) => {
  const { form, isSaving, onSubmit } = useBeamsetterForm(equipmentId, onOpenChange);

  return (
    <>
      <Toaster />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>
              {equipmentId ? "Edit Beamsetter" : "Add New Beamsetter"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <BasicDetails form={form} />
              <NotesSection form={form} />
              <FormActions onCancel={() => onOpenChange(false)} isSaving={isSaving} />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};