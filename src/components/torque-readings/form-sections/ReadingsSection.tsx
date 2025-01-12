import { Reading } from "@/types/equipment";
import { FormField } from "@/components/torque-readings/FormField";
import { calculateDeviation } from "@/utils/certificateDataPreparation";

interface ReadingsSectionProps {
  readings: Reading[] | string;
  definitiveReadings: Reading[] | string;
  onChange: (field: string, value: Reading[]) => void;
}

export const ReadingsSection = ({
  readings,
  definitiveReadings,
  onChange
}: ReadingsSectionProps) => {
  // Parse readings if they're strings
  const parseReadings = (readingsData: Reading[] | string): Reading[] => {
    if (typeof readingsData === 'string') {
      try {
        const parsed = JSON.parse(readingsData);
        if (typeof parsed === 'string') {
          return JSON.parse(parsed);
        }
        return parsed;
      } catch (e) {
        console.error('Error parsing readings:', e);
        return Array(3).fill({ target: "", actual: "", deviation: "" });
      }
    }
    return Array.isArray(readingsData) ? readingsData : Array(3).fill({ target: "", actual: "", deviation: "" });
  };

  const handleReadingChange = (index: number, field: keyof Reading, value: string, isDefinitive: boolean) => {
    const readingsArray = isDefinitive ? parseReadings(definitiveReadings) : parseReadings(readings);
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

    if (!isDefinitive) {
      const definitiveArray = parseReadings(definitiveReadings);
      definitiveArray[index] = { ...reading };
      onChange("definitiveReadings", definitiveArray);
    }
  };

  const renderReadingsGroup = (isDefinitive: boolean) => {
    const currentReadings = parseReadings(isDefinitive ? definitiveReadings : readings);
    const title = isDefinitive ? "Definitive Readings" : "Initial Readings";

    return (
      <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
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