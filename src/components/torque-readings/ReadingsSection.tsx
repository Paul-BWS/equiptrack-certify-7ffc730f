import { Input } from "@/components/ui/input";

interface Reading {
  target: string;
  actual: string;
  deviation: string;
}

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

  return (
    <div className="bg-[#F9F9F9] p-6 rounded-lg">
      <h3 className="font-semibold mb-4 text-gray-900">{title}</h3>
      <div className="space-y-4">
        {readingsArray.map((reading, index) => (
          <div key={`${title}-${index}`} className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-[#C8C8C9]">Target</label>
              <Input
                value={reading.target}
                onChange={onChange ? (e) => onChange(index, "target", e.target.value) : undefined}
                placeholder="Target"
                className="h-12 bg-white border-gray-200"
                readOnly={readOnly}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#C8C8C9]">Actual</label>
              <Input
                value={reading.actual}
                onChange={onChange ? (e) => onChange(index, "actual", e.target.value) : undefined}
                placeholder="Actual"
                className="h-12 bg-white border-gray-200"
                readOnly={readOnly}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#C8C8C9]">Deviation (%)</label>
              <Input
                value={reading.deviation}
                placeholder="Deviation"
                className="h-12 bg-[#F9F9F9] border-gray-200"
                readOnly
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};