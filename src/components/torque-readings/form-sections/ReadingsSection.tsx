import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";

interface ReadingsSectionProps {
  title: string;
  readings: TorqueReadingsForm;
  onChange?: (index: number, field: string, value: string) => void;
  readOnly?: boolean;
}

export const ReadingsSection = ({ title, readings, onChange, readOnly }: ReadingsSectionProps) => {
  return (
    <div className="bg-[#F9F9F9] p-6 rounded-lg space-y-4">
      <h3 className="text-base font-medium text-gray-900">{title}</h3>
      {[0, 1, 2].map((index) => (
        <div key={index} className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-[#C8C8C9]">Target</label>
            <input
              type="number"
              value={readings[`target${index + 1}` as keyof TorqueReadingsForm] || ''}
              onChange={(e) => onChange?.(index, 'target', e.target.value)}
              className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
              readOnly={readOnly}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-[#C8C8C9]">Actual</label>
            <input
              type="number"
              value={readings[`actual${index + 1}` as keyof TorqueReadingsForm] || ''}
              onChange={(e) => onChange?.(index, 'actual', e.target.value)}
              className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
              readOnly={readOnly}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-[#C8C8C9]">Deviation (%)</label>
            <input
              value={readings[`deviation${index + 1}` as keyof TorqueReadingsForm] || ''}
              className="flex h-12 w-full rounded-md border border-gray-200 bg-[#F1F1F1] px-3 py-2 text-sm"
              readOnly
            />
          </div>
        </div>
      ))}
    </div>
  );
};