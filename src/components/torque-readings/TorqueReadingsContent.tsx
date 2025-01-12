import { Button } from "@/components/ui/button";
import { HeaderSection } from "./HeaderSection";
import { EquipmentSection } from "./EquipmentSection";
import { MeasurementsSection } from "./MeasurementsSection";
import { ReadingsSection } from "./ReadingsSection";
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
    <form onSubmit={handleSubmit} className="space-y-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

      <div className="space-y-2">
        <label className="text-sm text-gray-400">Notes</label>
        <textarea
          value={readings.notes}
          onChange={(e) => setReadings({ ...readings, notes: e.target.value })}
          className="w-full min-h-[100px] rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Enter any additional notes..."
        />
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-white hover:bg-gray-50 border-gray-200"
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
        <Button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Generate Certificate
        </Button>
      </div>
    </form>
  );
};