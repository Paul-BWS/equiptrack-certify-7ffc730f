import { Reading } from "@/types/tyreGauge";
import { Input } from "@/components/ui/input";

interface ReadingsSectionProps {
  readings: Reading[];
  onReadingsChange: (readings: Reading[]) => void;
}

export const ReadingsSection = ({ readings, onReadingsChange }: ReadingsSectionProps) => {
  const handleReadingChange = (index: number, field: keyof Reading, value: string) => {
    const newReadings = [...readings];
    newReadings[index] = {
      ...newReadings[index],
      [field]: value,
    };
    onReadingsChange(newReadings);
  };

  // Ensure we always have exactly 4 readings (2 for AS FOUND, 2 for DEFINITIVE)
  const displayReadings = readings.length < 4 ? [
    { target: "", actual: "", deviation: "" },
    { target: "", actual: "", deviation: "" },
    { target: "", actual: "", deviation: "" },
    { target: "", actual: "", deviation: "" }
  ] : readings;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {['AS FOUND', 'DEFINITIVE'].map((title, groupIndex) => (
          <div key={title} className="bg-[#F9F9F9] p-6 rounded-lg">
            <h3 className="font-semibold mb-4 text-gray-900">{title}</h3>
            <div className="space-y-4">
              {[0, 1].map((rowIndex) => {
                const readingIndex = groupIndex * 2 + rowIndex;
                return (
                  <div key={`${title}-${rowIndex}`} className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-[#C8C8C9]">Target</label>
                      <Input
                        type="number"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        value={displayReadings[readingIndex]?.target || ''}
                        onChange={(e) => handleReadingChange(readingIndex, 'target', e.target.value)}
                        className="h-12 bg-white border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-[#C8C8C9]">Actual</label>
                      <Input
                        type="number"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        value={displayReadings[readingIndex]?.actual || ''}
                        onChange={(e) => handleReadingChange(readingIndex, 'actual', e.target.value)}
                        className="h-12 bg-white border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-[#C8C8C9]">Deviation (%)</label>
                      <Input
                        value={displayReadings[readingIndex]?.deviation || ''}
                        readOnly
                        className="h-12 bg-[#F9F9F9] border-gray-200"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};