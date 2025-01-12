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
    // Update the field value
    onReadingChange(index, field, value);
    
    // Get the current values for calculation
    const targetValue = field === 'target' ? value : reading.target;
    const actualValue = field === 'actual' ? value : reading.actual;
    
    // Convert to numbers for calculation
    const targetNum = parseFloat(targetValue);
    const actualNum = parseFloat(actualValue);
    
    // Calculate deviation only if both values are valid numbers
    if (!isNaN(targetNum) && !isNaN(actualNum) && targetNum !== 0) {
      const difference = actualNum - targetNum;
      const deviationPercentage = (difference / targetNum) * 100;
      onReadingChange(index, 'deviation', `${deviationPercentage.toFixed(2)}%`);
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
        placeholder="Enter target"
        step="any"
      />
      <Input
        type="number"
        value={reading.actual}
        onChange={(e) => handleValueChange('actual', e.target.value)}
        className="border rounded p-2"
        placeholder="Enter actual"
        step="any"
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