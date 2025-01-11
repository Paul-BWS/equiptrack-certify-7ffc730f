import { Button } from "@/components/ui/button";
import { HeaderSection } from "./HeaderSection";
import { EquipmentSection } from "./EquipmentSection";
import { MeasurementsSection } from "./MeasurementsSection";
import { ReadingsSection } from "./ReadingsSection";
import { FormField } from "./FormField";
import { useIsMobile } from "@/hooks/use-mobile";
import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";

interface TorqueReadingsContentProps {
  readings: TorqueReadingsForm;
  setReadings: (readings: TorqueReadingsForm) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleSave: () => void;
  isSaving: boolean;
  handleReadingChange: (index: number, field: string, value: string) => void;
}

export const TorqueReadingsContent = ({
  readings,
  setReadings,
  handleSubmit,
  handleSave,
  isSaving,
  handleReadingChange,
}: TorqueReadingsContentProps) => {
  const isMobile = useIsMobile();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <HeaderSection
        date={readings.date}
        retestDate={readings.retestDate}
        certNumber={readings.certNumber}
        status={readings.status}
        onDateChange={(value) => setReadings({ ...readings, date: value })}
        onRetestDateChange={(value) => setReadings({ ...readings, retestDate: value })}
      />

      <EquipmentSection
        model={readings.model}
        serialNumber={readings.serialNumber}
        engineer={readings.engineer}
        sentOn={readings.sentOn}
        onModelChange={(value) => setReadings({ ...readings, model: value })}
        onSerialNumberChange={(value) => setReadings({ ...readings, serialNumber: value })}
        onEngineerChange={(value) => setReadings({ ...readings, engineer: value })}
      />

      <MeasurementsSection
        min={readings.min}
        max={readings.max}
        units={readings.units}
        result={readings.result}
        onMinChange={(value) => setReadings({ ...readings, min: value })}
        onMaxChange={(value) => setReadings({ ...readings, max: value })}
        onUnitsChange={(value) => setReadings({ ...readings, units: value })}
        onResultChange={(value) => setReadings({ ...readings, result: value })}
      />

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-8">
          <ReadingsSection
            title="AS FOUND"
            readings={readings.readings}
            onChange={handleReadingChange}
          />
          <ReadingsSection
            title="DEFINITIVE"
            readings={readings.definitiveReadings}
            readOnly
          />
        </div>
      </div>

      <FormField
        id="notes"
        label="Notes"
        value={readings.notes}
        onChange={(e) => setReadings({ ...readings, notes: e.target.value })}
      />

      {!isMobile && (
        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button type="submit">Generate Certificate</Button>
        </div>
      )}
    </form>
  );
};