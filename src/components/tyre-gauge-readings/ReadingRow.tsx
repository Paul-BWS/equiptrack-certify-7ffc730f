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
    // Allow empty string or valid numbers
    if (value === '' || !isNaN(Number(value))) {
      onReadingChange(index, field, value);
      
      // Calculate deviation only if both values are valid numbers
      const targetNum = field === 'target' ? Number(value) : Number(reading.target);
      const actualNum = field === 'actual' ? Number(value) : Number(reading.actual);
      
      if (!isNaN(targetNum) && !isNaN(actualNum) && targetNum !== 0) {
        const difference = actualNum - targetNum;
        const deviation = ((difference / targetNum) * 100).toFixed(2);
        onReadingChange(index, 'deviation', `${deviation}%`);
      } else {
        onReadingChange(index, 'deviation', '');
      }
    }
  };

  return (
    <React.Fragment>
      <Input
        type="text"
        value={reading.target}
        onChange={(e) => handleValueChange('target', e.target.value)}
        className="border rounded p-2"
        placeholder="Enter target"
      />
      <Input
        type="text"
        value={reading.actual}
        onChange={(e) => handleValueChange('actual', e.target.value)}
        className="border rounded p-2"
        placeholder="Enter actual"
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