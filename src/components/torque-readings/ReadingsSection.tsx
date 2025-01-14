import { FormField } from "@/components/torque-readings/FormField";
import { calculateDeviation } from "@/utils/deviationCalculator";

interface ReadingsSectionProps {
  title: string;
  readings: any;
  onChange?: (index: number, field: string, value: string) => void;
  readOnly?: boolean;
}

export const ReadingsSection = ({
  title,
  readings,
  onChange,
  readOnly,
}: ReadingsSectionProps) => {
  const getReadingValue = (index: number, field: string) => {
    const readingNumber = (index + 1).toString();
    const prefix = title.toLowerCase().includes('definitive') ? 'def_' : '';
    const fieldName = `${prefix}${field}${readingNumber}`;
    return readings?.[fieldName] || '';
  };

  return (
    <div className="bg-[#F1F1F1] p-6 rounded-lg">
      <h3 className="font-semibold mb-4 text-base text-gray-900">{title}</h3>
      <div className="space-y-4">
        {[0, 1, 2].map((index) => (
          <div key={`${title}-${index}`} className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-base text-[#C8C8C9]">Target</label>
              <input
                type="number"
                value={getReadingValue(index, 'target')}
                onChange={(e) => onChange?.(index, "target", e.target.value)}
                className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base"
                readOnly={readOnly}
              />
            </div>
            <div className="space-y-2">
              <label className="text-base text-[#C8C8C9]">Actual</label>
              <input
                type="number"
                value={getReadingValue(index, 'actual')}
                onChange={(e) => onChange?.(index, "actual", e.target.value)}
                className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base"
                readOnly={readOnly}
              />
            </div>
            <div className="space-y-2">
              <label className="text-base text-[#C8C8C9]">Deviation (%)</label>
              <input
                value={getReadingValue(index, 'deviation')}
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