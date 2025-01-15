import { useFormState } from "./useFormState";
import { useFormSubmit } from "./useFormSubmit";
import { useDataLoader } from "./useDataLoader";

export const useTyreGaugeForm = (equipmentId: string | null) => {
  const formState = useFormState(equipmentId);
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