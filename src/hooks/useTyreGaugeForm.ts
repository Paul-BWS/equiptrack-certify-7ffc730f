import { useState } from "react";
import { Reading } from "@/types/tyreGauge";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";
import { useFormState } from "./useFormState";
import { useFormSubmit } from "./useFormSubmit";
import { useDataLoader } from "./useDataLoader";

export const useTyreGaugeForm = (equipmentId: string | null) => {
  // Generate certificate number only once when the hook is initialized for a new entry
  const [certNumber] = useState(() => generateCertificateNumber());
  
  const formState = useFormState(equipmentId, certNumber);
  const { handleSubmit } = useFormSubmit(equipmentId, () => {
    window.location.reload();
  });
  const { resetForm } = useDataLoader(equipmentId, formState);

  return {
    ...formState,
    handleSubmit,
    resetForm,
  };
};