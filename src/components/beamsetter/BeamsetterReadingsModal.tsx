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
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const BeamsetterReadingsModal = ({
  open,
  onOpenChange,
  equipmentId,
}: BeamsetterModalProps) => {
  const queryClient = useQueryClient();
  const { customerId } = useParams();
  const { form, isSaving, onSubmit } = useBeamsetterForm(equipmentId, async () => {
    await queryClient.invalidateQueries({
      queryKey: ['equipment', customerId, 'beamsetter']
    });
    onOpenChange(false);
  });

  return (
    <>
      <Toaster />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl bg-white p-0">
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="text-xl font-semibold">
              {equipmentId ? "Edit Beamsetter" : "Add New Beamsetter"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6 p-6">
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