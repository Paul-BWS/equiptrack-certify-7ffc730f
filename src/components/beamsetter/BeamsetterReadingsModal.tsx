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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";
import { supabase } from "@/lib/supabase";

interface BeamsetterReadingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}

interface BeamsetterFormData {
  certNumber: string;
  model: string;
  serialNumber: string;
  engineer: string;
  status: string;
  notes: string;
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {equipmentId ? "Edit Beamsetter" : "Add New Beamsetter"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="certNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate Number</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serialNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serial Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="engineer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Engineer</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};