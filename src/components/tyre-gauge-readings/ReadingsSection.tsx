import React from 'react';
import { Reading } from "@/types/tyreGauge";

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

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Readings</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="font-medium">Target</div>
        <div className="font-medium">Actual</div>
        <div className="font-medium">Deviation</div>
        {readings.map((reading, index) => (
          <React.Fragment key={index}>
            <input
              type="text"
              value={reading.target}
              onChange={(e) => handleReadingChange(index, 'target', e.target.value)}
              className="border rounded p-2"
            />
            <input
              type="text"
              value={reading.actual}
              onChange={(e) => handleReadingChange(index, 'actual', e.target.value)}
              className="border rounded p-2"
            />
            <input
              type="text"
              value={reading.deviation}
              onChange={(e) => handleReadingChange(index, 'deviation', e.target.value)}
              className="border rounded p-2"
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};