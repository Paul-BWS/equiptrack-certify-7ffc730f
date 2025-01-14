import { Reading } from "@/types/equipment";
import { FormField } from "@/components/torque-readings/FormField";
import { calculateDeviation } from "@/utils/certificateDataPreparation";

interface ReadingsSectionProps {
  title: string;
  readings: Reading[];
  onChange?: (index: number, field: keyof Reading, value: string) => void;
  readOnly?: boolean;
}

export const ReadingsSection = ({
  title,
  readings = [],
  onChange,
  readOnly,
}: ReadingsSectionProps) => {
  const readingsArray = Array.isArray(readings) ? readings.slice(0, 3) : [];
  while (readingsArray.length < 3) {
    readingsArray.push({ target: "", actual: "", deviation: "" });
  }

  const handleInputChange = (index: number, field: keyof Reading, value: string) => {
    if (!onChange) return;

    const updatedReading = { ...readingsArray[index] };
    updatedReading[field] = value;

    // Calculate deviation when either target or actual changes
    if (field === 'target' || field === 'actual') {
      const target = field === 'target' ? value : updatedReading.target;
      const actual = field === 'actual' ? value : updatedReading.actual;
      
      if (target && actual) {
        updatedReading.deviation = calculateDeviation(target, actual);
      } else {
        updatedReading.deviation = "";
      }
    }

    onChange(index, field, value);
  };

  return (
    <div className="bg-[#F1F1F1] p-6 rounded-lg">
      <h3 className="font-semibold mb-4 text-base text-gray-900">{title}</h3>
      <div className="space-y-4">
        {readingsArray.map((reading, index) => (
          <div key={`${title}-${index}`} className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-base text-[#C8C8C9]">Target</label>
              <input
                value={reading.target}
                onChange={(e) => handleInputChange(index, "target", e.target.value)}
                className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base"
                readOnly={readOnly}
              />
            </div>
            <div className="space-y-2">
              <label className="text-base text-[#C8C8C9]">Actual</label>
              <input
                value={reading.actual}
                onChange={(e) => handleInputChange(index, "actual", e.target.value)}
                className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base"
                readOnly={readOnly}
              />
            </div>
            <div className="space-y-2">
              <label className="text-base text-[#C8C8C9]">Deviation (%)</label>
              <input
                value={reading.deviation}
                className="flex h-12 w-full rounded-md border border-gray-200 bg-[#F1F1F1] px-3 py-2 text-base"
                readOnly
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};