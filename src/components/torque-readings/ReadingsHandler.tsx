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
    const fieldPrefix = field === 'target' ? 'target' : field === 'actual' ? 'actual' : 'deviation';
    const readingNumber = (index + 1).toString();
    const fieldName = `${fieldPrefix}${readingNumber}`;
    const defFieldName = `def_${fieldPrefix}${readingNumber}`;
    
    // Update the reading
    const updatedReadings = {
      ...readings,
      [fieldName]: value
    };

    // Calculate deviation if both target and actual are present
    if (field === 'target' || field === 'actual') {
      const targetField = field === 'target' ? value : readings[`target${readingNumber}` as keyof TorqueReadingsForm];
      const actualField = field === 'actual' ? value : readings[`actual${readingNumber}` as keyof TorqueReadingsForm];
      
      if (targetField && actualField) {
        const deviation = calculateDeviation(targetField, actualField);
        updatedReadings[`deviation${readingNumber}` as keyof TorqueReadingsForm] = deviation;
        updatedReadings[`def_target${readingNumber}` as keyof TorqueReadingsForm] = targetField;
        updatedReadings[`def_actual${readingNumber}` as keyof TorqueReadingsForm] = actualField;
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