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
  // Ensure readings is always an array with at least 3 items
  const readingsArray = Array.isArray(readings) ? readings : [];
  const paddedReadings = [...readingsArray];
  while (paddedReadings.length < 3) {
    paddedReadings.push({ target: "", actual: "", deviation: "" });
  }

  return (
    <div>
      <h3 className="font-semibold mb-4">{title}</h3>
      {paddedReadings.map((reading, index) => (
        <div key={`${title}-${index}`} className="grid grid-cols-3 gap-2 mb-2">
          <Input
            value={reading.target}
            onChange={onChange ? (e) => onChange(index, "target", e.target.value) : undefined}
            placeholder="Target"
            className="text-sm bg-[#F9F9F9] placeholder:text-[#CCCCCC]"
            readOnly={readOnly}
          />
          <Input
            value={reading.actual}
            onChange={onChange ? (e) => onChange(index, "actual", e.target.value) : undefined}
            placeholder="Actual"
            className="text-sm bg-[#F9F9F9] placeholder:text-[#CCCCCC]"
            readOnly={readOnly}
          />
          <Input
            value={reading.deviation}
            placeholder="Deviation"
            className="text-sm bg-[#F9F9F9] placeholder:text-[#CCCCCC]"
            readOnly
          />
        </div>
      ))}
    </div>
  );
};