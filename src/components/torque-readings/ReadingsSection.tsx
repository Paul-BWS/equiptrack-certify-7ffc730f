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
  // Ensure readings is always an array with exactly 3 items
  const readingsArray = Array.isArray(readings) ? readings.slice(0, 3) : [];
  while (readingsArray.length < 3) {
    readingsArray.push({ target: "", actual: "", deviation: "" });
  }

  return (
    <div>
      <h3 className="font-semibold mb-4 text-black">{title}</h3>
      {readingsArray.map((reading, index) => (
        <div key={`${title}-${index}`} className="grid grid-cols-3 gap-4 mb-4">
          <Input
            value={reading.target}
            onChange={onChange ? (e) => onChange(index, "target", e.target.value) : undefined}
            placeholder="Target"
            className="h-12 bg-white border-gray-200"
            readOnly={readOnly}
          />
          <Input
            value={reading.actual}
            onChange={onChange ? (e) => onChange(index, "actual", e.target.value) : undefined}
            placeholder="Actual"
            className="h-12 bg-white border-gray-200"
            readOnly={readOnly}
          />
          <Input
            value={reading.deviation}
            placeholder="Deviation"
            className="h-12 bg-gray-50 border-gray-200"
            readOnly
          />
        </div>
      ))}
    </div>
  );
};