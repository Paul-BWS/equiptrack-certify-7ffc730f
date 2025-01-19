import { FormProps } from "@/types/lifting-equipment-form";
import { BasicDetails } from "./form-sections/BasicDetails";
import { NotesSection } from "./form-sections/NotesSection";
import { FormActions } from "./form-sections/FormActions";

export const ModalForm = ({
  readings,
  setReadings,
  onSubmit,
  onCancel,
  onDelete,
  isSaving,
  equipmentId
}: FormProps) => {
  const handleFieldChange = (field: keyof typeof readings, value: string) => {
    setReadings({
      ...readings,
      [field]: value
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <BasicDetails
        readings={readings}
        onChange={handleFieldChange}
      />
      
      <div className="bg-[#F9F9F9] p-6 rounded-lg">
        <NotesSection
          value={readings.notes}
          onChange={(value) => handleFieldChange("notes", value)}
        />
      </div>

      <FormActions
        onCancel={onCancel}
        onDelete={onDelete}
        isSaving={isSaving}
        equipmentId={equipmentId}
      />
    </form>
  );
};