import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Reading {
  setting: string;
  reading: string;
  deviation: string;
}

interface ReadingsSectionProps {
  readings: Reading[];
  onReadingsChange: (readings: Reading[]) => void;
}

export const ReadingsSection = ({
  readings,
  onReadingsChange,
}: ReadingsSectionProps) => {
  const calculateDeviation = (setting: string, reading: string): string => {
    if (!setting || !reading) return "";
    const settingValue = parseFloat(setting);
    const readingValue = parseFloat(reading);
    if (isNaN(settingValue) || isNaN(readingValue) || settingValue === 0) return "";
    const deviation = ((readingValue - settingValue) / settingValue) * 100;
    return deviation.toFixed(2);
  };

  const handleReadingChange = (index: number, field: keyof Reading, value: string) => {
    const newReadings = [...readings];
    newReadings[index] = {
      ...newReadings[index],
      [field]: value,
    };

    if (field === 'setting' || field === 'reading') {
      newReadings[index].deviation = calculateDeviation(
        field === 'setting' ? value : newReadings[index].setting,
        field === 'reading' ? value : newReadings[index].reading
      );
    }

    onReadingsChange(newReadings);
  };

  return (
    <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Readings</h3>
      <div className="space-y-6">
        {readings.map((reading, index) => (
          <div key={index} className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-sm text-[#C8C8C9]">Setting {index + 1}</Label>
              <Input
                value={reading.setting}
                onChange={(e) => handleReadingChange(index, 'setting', e.target.value)}
                className="h-12 bg-white border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-[#C8C8C9]">Reading {index + 1}</Label>
              <Input
                value={reading.reading}
                onChange={(e) => handleReadingChange(index, 'reading', e.target.value)}
                className="h-12 bg-white border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-[#C8C8C9]">Deviation {index + 1}</Label>
              <Input
                value={reading.deviation ? `${reading.deviation}%` : ""}
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