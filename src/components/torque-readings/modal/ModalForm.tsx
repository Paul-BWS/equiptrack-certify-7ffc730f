import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";
import { HeaderSection } from "../HeaderSection";
import { MeasurementsSection } from "../MeasurementsSection";
import { ReadingsSection } from "../ReadingsSection";
import { NotesSection } from "../NotesSection";
import { FormActions } from "./form-sections/FormActions";
import { addDays, format } from "date-fns";

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
    if (field === "date") {
      // When the date changes, automatically update the retest date
      const newDate = new Date(value);
      const newRetestDate = addDays(newDate, 364);
      setReadings({
        ...readings,
        date: value,
        retestDate: format(newRetestDate, 'yyyy-MM-dd')
      });
    } else {
      setReadings({
        ...readings,
        [field]: value
      });
    }
  };

  const handleReadingChange = (index: number, field: string, value: string) => {
    const readingNumber = (index + 1).toString();
    const targetField = `${field}${readingNumber}` as keyof TorqueReadingsForm;
    const defTargetField = `def_${field}${readingNumber}` as keyof TorqueReadingsForm;
    
    handleFieldChange(targetField, value);
    handleFieldChange(defTargetField, value);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 p-6">
      <div className="space-y-6">
        <div className="bg-[#F9F9F9] p-6 rounded-lg">
          <HeaderSection
            date={readings.date}
            retestDate={readings.retestDate}
            status={readings.status}
            certNumber={readings.certNumber}
            engineer={readings.engineer}
            onDateChange={(value) => handleFieldChange("date", value)}
            onStatusChange={(value) => handleFieldChange("status", value)}
            onEngineerChange={(value) => handleFieldChange("engineer", value)}
          />
        </div>
        
        <div className="bg-[#F9F9F9] p-6 rounded-lg">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#F9F9F9] p-6 rounded-lg">
            <ReadingsSection
              title="AS FOUND"
              readings={readings}
              onChange={handleReadingChange}
            />
          </div>
          <div className="bg-[#F9F9F9] p-6 rounded-lg">
            <ReadingsSection
              title="DEFINITIVE"
              readings={readings}
              onChange={handleReadingChange}
              readOnly
            />
          </div>
        </div>

        <div className="bg-[#F9F9F9] p-6 rounded-lg">
          <NotesSection
            notes={readings.notes}
            onChange={(value) => handleFieldChange("notes", value)}
          />
        </div>
      </div>

      <FormActions
        onClose={onClose}
        onDelete={onDelete}
        isSaving={isSaving}
        equipmentId={equipmentId}
      />
    </form>
  );
};