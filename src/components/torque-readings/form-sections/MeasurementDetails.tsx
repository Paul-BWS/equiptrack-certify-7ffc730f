import { MeasurementsSection } from "../MeasurementsSection";
import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";

interface MeasurementDetailsProps {
  readings: TorqueReadingsForm;
  onFieldChange: (field: keyof TorqueReadingsForm, value: string) => void;
}

export const MeasurementDetails = ({ readings, onFieldChange }: MeasurementDetailsProps) => {
  return (
    <MeasurementsSection
      min={readings.min}
      max={readings.max}
      units={readings.units}
      result={readings.result}
      onMinChange={(value) => onFieldChange("min", value)}
      onMaxChange={(value) => onFieldChange("max", value)}
      onUnitsChange={(value) => onFieldChange("units", value)}
      onResultChange={(value) => onFieldChange("result", value)}
    />
  );
};