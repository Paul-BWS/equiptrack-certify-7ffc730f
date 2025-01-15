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
    const readingNumber = (index + 1).toString();
    
    // Create a copy of the current readings
    const updatedReadings = { ...readings };
    
    // Update the AS FOUND fields
    if (field === 'target') {
      updatedReadings[`target${readingNumber}` as keyof TorqueReadingsForm] = value;
      updatedReadings[`def_target${readingNumber}` as keyof TorqueReadingsForm] = value;
      
      // Calculate deviation if actual value exists
      const actualValue = updatedReadings[`actual${readingNumber}` as keyof TorqueReadingsForm];
      if (actualValue) {
        const deviation = calculateDeviation(value, actualValue);
        updatedReadings[`deviation${readingNumber}` as keyof TorqueReadingsForm] = deviation;
        updatedReadings[`def_deviation${readingNumber}` as keyof TorqueReadingsForm] = deviation;
      }
    } else if (field === 'actual') {
      updatedReadings[`actual${readingNumber}` as keyof TorqueReadingsForm] = value;
      updatedReadings[`def_actual${readingNumber}` as keyof TorqueReadingsForm] = value;
      
      // Calculate deviation if target value exists
      const targetValue = updatedReadings[`target${readingNumber}` as keyof TorqueReadingsForm];
      if (targetValue) {
        const deviation = calculateDeviation(targetValue, value);
        updatedReadings[`deviation${readingNumber}` as keyof TorqueReadingsForm] = deviation;
        updatedReadings[`def_deviation${readingNumber}` as keyof TorqueReadingsForm] = deviation;
      }
    }

    setReadings(updatedReadings);
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