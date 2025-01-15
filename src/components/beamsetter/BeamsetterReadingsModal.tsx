import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";
import { supabase } from "@/lib/supabase";
import { Toaster } from "@/components/ui/sonner";
import { BasicDetails } from "./readings-form/BasicDetails";
import { NotesSection } from "./readings-form/NotesSection";
import { FormActions } from "./readings-form/FormActions";
import { format } from "date-fns";

export interface BeamsetterFormData {
  certNumber: string;
  model: string;
  serialNumber: string;
  engineer: string;
  status: string;
  notes: string;
  lastServiceDate: Date;
}

export const BeamsetterReadingsModal = ({
  open,
  onOpenChange,
  equipmentId,
}: BeamsetterReadingsModalProps) => {
  const { customerId } = useParams();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<BeamsetterFormData>({
    defaultValues: {
      certNumber: generateCertificateNumber(),
      model: "",
      serialNumber: "",
      engineer: "",
      status: "ACTIVE",
      notes: "",
      lastServiceDate: new Date(),
    },
  });

  const onSubmit = async (data: BeamsetterFormData) => {
    if (!customerId) return;
    setIsSaving(true);

    try {
      const beamsetterData = {
        company_id: customerId,
        cert_number: data.certNumber,
        model: data.model,
        serial_number: data.serialNumber,
        engineer: data.engineer,
        status: data.status,
        notes: data.notes,
        last_service_date: format(data.lastServiceDate, 'yyyy-MM-dd'),
      };

      if (equipmentId) {
        const { error } = await supabase
          .from("beamsetter")
          .update(beamsetterData)
          .eq("id", equipmentId);

        if (error) throw error;
        toast.success("Beamsetter updated successfully");
      } else {
        const { error } = await supabase
          .from("beamsetter")
          .insert([beamsetterData]);

        if (error) throw error;
        toast.success("New beamsetter created successfully");
      }

      onOpenChange(false);
    } catch (error) {
      console.error("Error saving beamsetter:", error);
      toast.error(
        equipmentId
          ? "Failed to update beamsetter"
          : "Failed to create new beamsetter"
      );
    } finally {
      setIsSaving(false);
    }
  };

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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