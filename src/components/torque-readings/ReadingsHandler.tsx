import { Reading } from "@/types/equipment";
import { calculateDeviation } from "@/utils/deviationCalculator";
import { TorqueReadingsContent } from "./TorqueReadingsContent";
import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";

interface ReadingsHandlerProps {
  readings: TorqueReadingsForm;
  setReadings: (readings: TorqueReadingsForm) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleSave: () => void;
  isSaving: boolean;
}

export const ReadingsHandler = ({ 
  readings, 
  setReadings, 
  handleSubmit,
  handleSave,
  isSaving 
}: ReadingsHandlerProps) => {
  const handleReadingChange = (index: number, field: string, value: string) => {
    // Create new arrays with fresh objects to avoid circular references
    const newReadings = readings.readings.map(reading => ({
      target: reading.target || "",
      actual: reading.actual || "",
      deviation: reading.deviation || ""
    }));

    const newDefinitiveReadings = readings.definitiveReadings.map(reading => ({
      target: reading.target || "",
      actual: reading.actual || "",
      deviation: reading.deviation || ""
    }));
    
    // Update the reading in the "as found" section
    newReadings[index] = { 
      ...newReadings[index], 
      [field]: value 
    };
    
    // Calculate deviation for "as found" reading
    if (field === 'target' || field === 'actual') {
      const target = field === 'target' ? value : newReadings[index].target;
      const actual = field === 'actual' ? value : newReadings[index].actual;
      
      if (target && actual) {
        const deviation = calculateDeviation(target, actual);
        newReadings[index].deviation = deviation;
        
        // Update definitive reading with the same values
        newDefinitiveReadings[index] = {
          target: target,
          actual: actual,
          deviation: deviation
        };
      } else {
        newReadings[index].deviation = "";
        newDefinitiveReadings[index].deviation = "";
      }
    }

    // Update both readings arrays
    setReadings({
      ...readings,
      readings: newReadings,
      definitiveReadings: newDefinitiveReadings
    });
  };

  return (
    <TorqueReadingsContent
      readings={readings}
      setReadings={setReadings}
      handleReadingChange={handleReadingChange}
      handleSubmit={handleSubmit}
      handleSave={handleSave}
      isSaving={isSaving}
    />
  );
};