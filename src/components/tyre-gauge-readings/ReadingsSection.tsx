import { Reading } from "@/types/tyreGauge";
import { Input } from "@/components/ui/input";

interface ReadingsSectionProps {
  readings: Reading[];
  definitiveReadings?: Reading[];
  onReadingsChange: (readings: Reading[]) => void;
  onDefinitiveReadingsChange?: (readings: Reading[]) => void;
}

export const ReadingsSection = ({ 
  readings, 
  definitiveReadings = [], 
  onReadingsChange,
  onDefinitiveReadingsChange
}: ReadingsSectionProps) => {
  const handleReadingChange = (index: number, field: keyof Reading, value: string, isDefinitive: boolean) => {
    const targetReadings = isDefinitive ? [...definitiveReadings] : [...readings];
    
    // Ensure we have enough readings
    while (targetReadings.length <= index) {
      targetReadings.push({ target: "", actual: "", deviation: "" });
    }

    // Update the specific reading
    targetReadings[index] = {
      ...targetReadings[index],
      [field]: value,
      deviation: field === 'actual' && targetReadings[index].target ? 
        calculateDeviation(targetReadings[index].target, value) :
        field === 'target' && targetReadings[index].actual ?
        calculateDeviation(value, targetReadings[index].actual) :
        ""
    };

    if (isDefinitive) {
      onDefinitiveReadingsChange?.(targetReadings);
    } else {
      onReadingsChange(targetReadings);
    }
  };

  const calculateDeviation = (target: string, actual: string) => {
    const targetNum = parseFloat(target);
    const actualNum = parseFloat(actual);
    
    if (!isNaN(targetNum) && !isNaN(actualNum) && targetNum !== 0) {
      const deviation = ((actualNum - targetNum) / targetNum) * 100;
      return deviation.toFixed(2);
    }
    return "";
  };

  const renderReadingsSection = (title: string, isDefinitive: boolean) => (
    <div className="bg-[#F9F9F9] p-6 rounded-lg">
      <h3 className="font-semibold mb-4 text-gray-900">{title}</h3>
      <div className="space-y-4">
        {[0, 1].map((rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-[#C8C8C9]">Target</label>
              <Input
                type="text"
                inputMode="decimal"
                value={(isDefinitive ? definitiveReadings : readings)[rowIndex]?.target || ''}
                onChange={(e) => handleReadingChange(rowIndex, 'target', e.target.value, isDefinitive)}
                className="h-12 bg-white border-gray-200"
                placeholder="Enter target"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#C8C8C9]">Actual</label>
              <Input
                type="text"
                inputMode="decimal"
                value={(isDefinitive ? definitiveReadings : readings)[rowIndex]?.actual || ''}
                onChange={(e) => handleReadingChange(rowIndex, 'actual', e.target.value, isDefinitive)}
                className="h-12 bg-white border-gray-200"
                placeholder="Enter actual"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#C8C8C9]">Deviation (%)</label>
              <Input
                value={(isDefinitive ? definitiveReadings : readings)[rowIndex]?.deviation || ''}
                readOnly
                className="h-12 bg-[#F9F9F9] border-gray-200"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderReadingsSection("As Found", false)}
      {renderReadingsSection("Definitive", true)}
    </div>
  );
};