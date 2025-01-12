import React from 'react';
import { Reading } from "@/types/tyreGauge";
import { ReadingRow } from "./ReadingRow";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

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

  const handleDeleteReading = (index: number) => {
    const newReadings = readings.filter((_, i) => i !== index);
    onReadingsChange(newReadings);
  };

  const handleAddReading = () => {
    onReadingsChange([...readings, { target: "", actual: "", deviation: "" }]);
  };

  const handleResetReadings = () => {
    onReadingsChange([{ target: "", actual: "", deviation: "" }]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Readings</h3>
        <div className="space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResetReadings}
            className="text-red-500 hover:text-red-600"
          >
            Reset All
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddReading}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Reading
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-4">
          <div className="col-span-2 font-medium">Target</div>
          <div className="col-span-2 font-medium">Actual</div>
          <div className="col-span-2 font-medium">Deviation</div>
          <div className="col-span-1"></div>
        </div>
        
        {readings.map((reading, index) => (
          <div key={index} className="grid grid-cols-7 gap-4 items-center">
            <div className="col-span-2">
              <ReadingRow
                reading={reading}
                index={index}
                onReadingChange={handleReadingChange}
              />
            </div>
            <div className="col-span-2">
              <input
                type="text"
                value={reading.actual}
                onChange={(e) => handleReadingChange(index, 'actual', e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="col-span-2">
              <input
                type="text"
                value={reading.deviation}
                readOnly
                className="w-full border rounded p-2 bg-gray-50"
              />
            </div>
            <div className="col-span-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteReading(index)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};