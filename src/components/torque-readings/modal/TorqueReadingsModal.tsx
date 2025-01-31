/**
 * @preserve
 * ⚠️ IMPORTANT: This modal has been carefully implemented and tested.
 * DO NOT modify this component unless explicitly required.
 * Any changes could affect critical torque wrench readings functionality.
 * 
 * Last verified working state: April 2024
 */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Toaster } from "@/components/ui/sonner";
import { X } from "lucide-react";
import { BasicDetailsSection } from "../form-sections/BasicDetailsSection";
import { MeasurementsSection } from "../form-sections/MeasurementsSection";
import { ReadingsSection } from "../form-sections/ReadingsSection";
import { NotesSection } from "../form-sections/NotesSection";
import { FormActions } from "../form-sections/FormActions";
import { useTorqueWrenchReadingsForm } from "@/hooks/useTorqueWrenchReadingsForm";

interface TorqueReadingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}

/**
 * @stable
 * This component handles the torque wrench readings modal.
 * It has been thoroughly tested with both AS FOUND and DEFINITIVE readings.
 * Modify with extreme caution.
 */
export const TorqueReadingsModal = ({
  open,
  onOpenChange,
  equipmentId,
}: TorqueReadingsModalProps) => {
  const { form, onSubmit, isSaving } = useTorqueWrenchReadingsForm(equipmentId, onOpenChange);

  return (
    <>
      <Toaster />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl bg-white p-0 overflow-y-auto max-h-[90vh]">
          <DialogClose 
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            disabled={isSaving}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader className="p-6 border-b bg-white">
            <DialogTitle className="text-xl font-semibold">
              {equipmentId ? "Edit Torque Wrench" : "Add New Torque Wrench"}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6 p-6">
              <fieldset disabled={isSaving} className="space-y-6">
                <BasicDetailsSection form={form} />
                <MeasurementsSection form={form} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ReadingsSection form={form} title="AS FOUND" />
                  <ReadingsSection form={form} title="DEFINITIVE" readOnly={false} />
                </div>
                
                <NotesSection form={form} />
                
                <FormActions
                  onCancel={() => onOpenChange(false)}
                  isSaving={isSaving}
                  equipmentId={equipmentId}
                />
              </fieldset>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};