import React from 'react';
import { Reading } from "@/types/tyreGauge";
import { Input } from "@/components/ui/input";

interface ReadingRowProps {
  reading: Reading;
  index: number;
  onReadingChange: (index: number, field: keyof Reading, value: string) => void;
}

export const ReadingRow = ({ reading, index, onReadingChange }: ReadingRowProps) => {
  const handleValueChange = (field: 'target' | 'actual', value: string) => {
    onReadingChange(index, field, value);
    
    // Immediately calculate deviation after value change
    const targetNum = field === 'target' ? parseFloat(value) : parseFloat(reading.target);
    const actualNum = field === 'actual' ? parseFloat(value) : parseFloat(reading.actual);
    
    if (!isNaN(targetNum) && !isNaN(actualNum) && targetNum !== 0) {
      // Calculate the percentage difference between actual and target
      const deviation = ((actualNum - targetNum) / targetNum * 100).toFixed(2);
      onReadingChange(index, 'deviation', `${deviation}%`);
    } else {
      onReadingChange(index, 'deviation', '');
    }
  };

  return (
    <React.Fragment>
      <Input
        type="number"
        value={reading.target}
        onChange={(e) => handleValueChange('target', e.target.value)}
        className="border rounded p-2"
      />
      <Input
        type="number"
        value={reading.actual}
        onChange={(e) => handleValueChange('actual', e.target.value)}
        className="border rounded p-2"
      />
      <Input
        type="text"
        value={reading.deviation}
        readOnly
        className="border rounded p-2 bg-gray-50"
      />
    </React.Fragment>
  );
};