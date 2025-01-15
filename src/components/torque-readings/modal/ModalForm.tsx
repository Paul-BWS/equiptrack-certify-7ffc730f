import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";
import { HeaderSection } from "../HeaderSection";
import { MeasurementsSection } from "../MeasurementsSection";
import { ReadingsSection } from "../ReadingsSection";
import { NotesSection } from "../NotesSection";
import { FormActions } from "./form-sections/FormActions";

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
    setReadings({
      ...readings,
      [field]: value
    });
  };

  const handleReadingChange = (index: number, field: string, value: string) => {
    const readingNumber = (index + 1).toString();
    const targetField = `${field}${readingNumber}` as keyof TorqueReadingsForm;
    const defTargetField = `def_${field}${readingNumber}` as keyof TorqueReadingsForm;
    
    handleFieldChange(targetField, value);
    handleFieldChange(defTargetField, value);
  };

  return (
    <form onSubmit={onSubmit} className="p-6 space-y-6">
      <HeaderSection
        date={readings.date}
        status={readings.status}
        retestDate={readings.retestDate}
        certNumber={readings.certNumber}
        engineer={readings.engineer}
        onDateChange={(value) => handleFieldChange("date", value)}
        onRetestDateChange={(value) => handleFieldChange("retestDate", value)}
        onStatusChange={(value) => handleFieldChange("status", value)}
        onEngineerChange={(value) => handleFieldChange("engineer", value)}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ReadingsSection
          title="AS FOUND"
          readings={readings}
          onChange={handleReadingChange}
        />
        <ReadingsSection
          title="DEFINITIVE"
          readings={readings}
          readOnly
        />
      </div>

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