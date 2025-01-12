import { Reading } from "@/types/equipment";
import { FormField } from "@/components/torque-readings/FormField";
import { calculateDeviation } from "@/utils/certificateDataPreparation";

interface ReadingsSectionProps {
  readings: Reading[];
  definitiveReadings: Reading[];
  onChange: (field: string, value: Reading[]) => void;
}

export const ReadingsSection = ({
  readings,
  definitiveReadings,
  onChange
}: ReadingsSectionProps) => {
  const handleReadingChange = (index: number, field: keyof Reading, value: string, isDefinitive: boolean) => {
    const readingsArray = isDefinitive ? [...definitiveReadings] : [...readings];
    const reading = { ...readingsArray[index] };

    if (field === "target" || field === "actual") {
      reading[field] = value;
      reading.deviation = calculateDeviation(
        field === "target" ? value : reading.target,
        field === "actual" ? value : reading.actual
      );
    } else {
      reading[field] = value;
    }

    readingsArray[index] = reading;
    onChange(isDefinitive ? "definitiveReadings" : "readings", readingsArray);
  };

  const renderReadingsGroup = (isDefinitive: boolean) => {
    const currentReadings = isDefinitive ? definitiveReadings : readings;
    const title = isDefinitive ? "Definitive Readings" : "Initial Readings";

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {currentReadings.map((reading, index) => (
          <div key={index} className="grid grid-cols-3 gap-4">
            <FormField
              id={`${isDefinitive ? "definitive" : "initial"}-target-${index}`}
              label="Target"
              value={reading.target}
              onChange={(e) => handleReadingChange(index, "target", e.target.value, isDefinitive)}
              type="number"
            />
            <FormField
              id={`${isDefinitive ? "definitive" : "initial"}-actual-${index}`}
              label="Actual"
              value={reading.actual}
              onChange={(e) => handleReadingChange(index, "actual", e.target.value, isDefinitive)}
              type="number"
            />
            <FormField
              id={`${isDefinitive ? "definitive" : "initial"}-deviation-${index}`}
              label="Deviation (%)"
              value={reading.deviation}
              readOnly
              className="bg-gray-50"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderReadingsGroup(false)}
      {renderReadingsGroup(true)}
    </div>
  );
};