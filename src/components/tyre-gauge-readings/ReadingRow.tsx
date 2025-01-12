import React, { useEffect } from 'react';
import { Reading } from "@/types/tyreGauge";
import { Input } from "@/components/ui/input";

interface ReadingRowProps {
  reading: Reading;
  index: number;
  onReadingChange: (index: number, field: keyof Reading, value: string) => void;
}

export const ReadingRow = ({ reading, index, onReadingChange }: ReadingRowProps) => {
  useEffect(() => {
    if (reading.target && reading.actual) {
      const targetNum = parseFloat(reading.target);
      const actualNum = parseFloat(reading.actual);
      
      if (!isNaN(targetNum) && !isNaN(actualNum) && targetNum !== 0) {
        const deviation = ((actualNum - targetNum) / targetNum * 100).toFixed(2);
        onReadingChange(index, 'deviation', `${deviation}%`);
      } else {
        onReadingChange(index, 'deviation', '');
      }
    } else {
      onReadingChange(index, 'deviation', '');
    }
  }, [reading.target, reading.actual, index, onReadingChange]);

  return (
    <Input
      type="text"
      value={reading.target}
      onChange={(e) => onReadingChange(index, 'target', e.target.value)}
      className="w-full"
    />
  );
};