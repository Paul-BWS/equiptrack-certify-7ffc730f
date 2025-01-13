import { HeaderSection } from "../HeaderSection";
import { BasicDetails } from "./form-sections/BasicDetails";
import { ReadingsSection } from "./form-sections/ReadingsSection";
import { NotesSection } from "./form-sections/NotesSection";
import { FormActions } from "./form-sections/FormActions";
import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";

interface ModalFormProps {
  readings: TorqueReadingsForm;
  setReadings: (readings: TorqueReadingsForm) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  onDelete?: () => void;
  isSaving: boolean;
  equipmentId: string | null;
}

export const ModalForm = ({
  readings,
  setReadings,
  onSubmit,
  onClose,
  onDelete,
  isSaving,
  equipmentId
}: ModalFormProps) => {
  const handleFieldChange = (field: keyof TorqueReadingsForm, value: any) => {
    setReadings({ ...readings, [field]: value });
  };

  return (
    <form onSubmit={onSubmit} className="p-6 space-y-6">
      <HeaderSection
        date={readings.date}
        status={readings.status}
        retestDate={readings.retestDate}
        certNumber={readings.certNumber}
        onDateChange={(value) => handleFieldChange("date", value)}
        onRetestDateChange={(value) => handleFieldChange("retestDate", value)}
        onStatusChange={(value) => handleFieldChange("status", value)}
      />
      
      <BasicDetails
        formData={readings}
        onChange={handleFieldChange}
      />
      
      <ReadingsSection
        formData={readings}
        onChange={handleFieldChange}
      />

      <NotesSection
        formData={readings}
        onChange={handleFieldChange}
      />

      <FormActions
        onClose={onClose}
        onDelete={onDelete}
        isSaving={isSaving}
        equipmentId={equipmentId}
      />
    </form>
  );
};