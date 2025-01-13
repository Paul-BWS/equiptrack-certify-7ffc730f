import { HeaderSection } from "../HeaderSection";
import { MeasurementsSection } from "../MeasurementsSection";
import { ReadingsSection } from "../ReadingsSection";
import { NotesSection } from "../NotesSection";
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
        retestDate={readings.retestDate}
        certNumber={readings.certNumber}
        onDateChange={(value) => handleFieldChange("date", value)}
        onRetestDateChange={(value) => handleFieldChange("retestDate", value)}
      />
      
      <MeasurementsSection
        min={readings.min}
        max={readings.max}
        units={readings.units}
        result={readings.result}
        onMinChange={(value) => handleFieldChange("min", value)}
        onMaxChange={(value) => handleFieldChange("max", value)}
        onUnitsChange={(value) => handleFieldChange("units", value)}
        onResultChange={(value) => handleFieldChange("result", value)}
      />
      
      <ReadingsSection
        title="Initial Readings"
        readings={readings.readings}
        onChange={(index, field, value) => {
          const newReadings = [...readings.readings];
          newReadings[index] = { ...newReadings[index], [field]: value };
          handleFieldChange("readings", newReadings);
        }}
      />

      <ReadingsSection
        title="Definitive Readings"
        readings={readings.definitiveReadings}
        readOnly
      />

      <NotesSection
        notes={readings.notes}
        onChange={(value) => handleFieldChange("notes", value)}
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