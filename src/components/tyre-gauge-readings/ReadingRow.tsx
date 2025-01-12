import React from 'react';
import { Reading } from "@/types/tyreGauge";
import { Input } from "@/components/ui/input";

interface ReadingRowProps {
  reading: Reading;
  index: number;
  onReadingChange: (index: number, field: keyof Reading, value: string) => void;
}

export const ReadingRow = ({ reading, index, onReadingChange }: ReadingRowProps) => {
  return (
    <React.Fragment>
      <Input
        type="text"
        value={reading.target}
        onChange={(e) => onReadingChange(index, 'target', e.target.value)}
        className="border rounded p-2"
        placeholder="Target value"
      />
      <Input
        type="text"
        value={reading.actual}
        onChange={(e) => onReadingChange(index, 'actual', e.target.value)}
        className="border rounded p-2"
        placeholder="Actual value"
      />
      <Input
        type="text"
        value={reading.deviation}
        onChange={(e) => onReadingChange(index, 'deviation', e.target.value)}
        className="border rounded p-2"
        placeholder="Deviation"
      />
    </React.Fragment>
  );
};