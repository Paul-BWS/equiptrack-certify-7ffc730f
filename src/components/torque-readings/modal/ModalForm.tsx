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
  return (
    <form onSubmit={onSubmit} className="p-6 space-y-6">
      <HeaderSection
        date={readings.date}
        status={readings.status}
        retestDate={readings.retestDate}
        certNumber={readings.certNumber}
        onDateChange={(value) => setReadings({ ...readings, date: value })}
        onRetestDateChange={(value) => setReadings({ ...readings, retestDate: value })}
      />
      
      <BasicDetails
        formData={readings}
        onChange={(field, value) => setReadings(prev => ({ ...prev, [field]: value }))}
      />
      
      <ReadingsSection
        readings={readings.readings}
        definitiveReadings={readings.definitiveReadings}
        onChange={(field, value) => setReadings(prev => ({ ...prev, [field]: value }))}
      />

      <NotesSection
        notes={readings.notes}
        onChange={(notes) => setReadings(prev => ({ ...prev, notes }))}
      />

      <FormActions
        onClose={onClose}
        isSaving={isSaving}
        onDelete={onDelete}
        equipmentId={equipmentId}
      />
    </form>
  );
};