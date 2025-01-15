import { useForm } from "react-hook-form";
import { BeamsetterFormData } from "@/types/beamsetter-form";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { format, addDays } from "date-fns";
import { toast } from "sonner";

export const useBeamsetterForm = (
  equipmentId: string | null,
  onOpenChange: (open: boolean) => void
) => {
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
      const nextServiceDate = addDays(data.lastServiceDate, 364);
      
      const beamsetterData = {
        company_id: customerId,
        cert_number: data.certNumber,
        model: data.model,
        serial_number: data.serialNumber,
        engineer: data.engineer,
        status: data.status,
        notes: data.notes,
        last_service_date: format(data.lastServiceDate, 'yyyy-MM-dd'),
        next_service_due: format(nextServiceDate, 'yyyy-MM-dd'),
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

  return {
    form,
    isSaving,
    onSubmit: form.handleSubmit(onSubmit),
  };
};