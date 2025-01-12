import { Reading } from "@/types/tyreGauge";
import { Input } from "@/components/ui/input";
import { calculateDeviation } from "@/utils/deviationCalculator";
import { useIsMobile } from "@/hooks/use-mobile";

interface ReadingsSectionProps {
  readings: Reading[];
  onReadingsChange: (readings: Reading[]) => void;
}

export const ReadingsSection = ({ readings, onReadingsChange }: ReadingsSectionProps) => {
  const isMobile = useIsMobile();
  
  const handleReadingChange = (index: number, field: keyof Reading, value: string) => {
    const newReadings = [...readings];
    newReadings[index] = {
      ...newReadings[index],
      [field]: value,
    };

    // Calculate deviation when either target or actual changes
    if (field === 'target' || field === 'actual') {
      const target = field === 'target' ? value : newReadings[index].target;
      const actual = field === 'actual' ? value : newReadings[index].actual;
      
      if (target && actual) {
        newReadings[index].deviation = calculateDeviation(target, actual);
      }
    }

    onReadingsChange(newReadings);
  };

  // Ensure we always have at least 2 readings
  const displayReadings = readings.length < 2 ? [
    { target: "", actual: "", deviation: "" },
    { target: "", actual: "", deviation: "" }
  ] : readings;

  const renderReadingsGroup = (title: string, isDefinitive: boolean) => (
    <div className="bg-[#F9F9F9] p-6 rounded-lg space-y-4 w-full">
      <h3 className="font-semibold mb-4 text-gray-900">{title}</h3>
      <div className="grid grid-cols-3 gap-4 mb-2">
        <div className="font-medium text-sm text-[#C8C8C9]">Target</div>
        <div className="font-medium text-sm text-[#C8C8C9]">Actual</div>
        <div className="font-medium text-sm text-[#C8C8C9]">Deviation (%)</div>
      </div>
      {displayReadings.map((reading, index) => (
        <div key={index} className="grid grid-cols-3 gap-4">
          <Input
            type="text"
            value={reading.target}
            onChange={(e) => handleReadingChange(index, 'target', e.target.value)}
            className="h-12 bg-white border-gray-200"
            placeholder="Enter target"
            readOnly={isDefinitive}
          />
          <Input
            type="text"
            value={reading.actual}
            onChange={(e) => handleReadingChange(index, 'actual', e.target.value)}
            className="h-12 bg-white border-gray-200"
            placeholder="Enter actual"
            readOnly={isDefinitive}
          />
          <Input
            type="text"
            value={reading.deviation}
            readOnly
            className="h-12 bg-[#F9F9F9] border-gray-200"
            placeholder="Deviation"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
        {renderReadingsGroup("AS FOUND", false)}
        {renderReadingsGroup("DEFINITIVE", true)}
      </div>
    </div>
  );
};