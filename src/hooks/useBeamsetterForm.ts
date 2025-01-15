import { useForm } from "react-hook-form";
import { BeamsetterFormData } from "@/types/beamsetter-form";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { format, addDays, parseISO } from "date-fns";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

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

  // Fetch existing beamsetter data if equipmentId is provided
  const { data: existingBeamsetter } = useQuery({
    queryKey: ['beamsetter', equipmentId],
    queryFn: async () => {
      if (!equipmentId) return null;
      
      const { data, error } = await supabase
        .from('beamsetter')
        .select('*')
        .eq('id', equipmentId)
        .single();

      if (error) {
        console.error('Error fetching beamsetter:', error);
        toast.error("Failed to load beamsetter data");
        throw error;
      }

      return data;
    },
    enabled: !!equipmentId,
  });

  // Update form when existing data is loaded
  useEffect(() => {
    if (existingBeamsetter) {
      form.reset({
        certNumber: existingBeamsetter.cert_number || generateCertificateNumber(),
        model: existingBeamsetter.model || "",
        serialNumber: existingBeamsetter.serial_number || "",
        engineer: existingBeamsetter.engineer || "",
        status: existingBeamsetter.status || "ACTIVE",
        notes: existingBeamsetter.notes || "",
        lastServiceDate: existingBeamsetter.last_service_date ? parseISO(existingBeamsetter.last_service_date) : new Date(),
      });
    }
  }, [existingBeamsetter, form]);

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