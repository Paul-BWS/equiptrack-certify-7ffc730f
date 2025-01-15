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
    const targetField = `target${readingNumber}` as keyof TorqueReadingsForm;
    const actualField = `actual${readingNumber}` as keyof TorqueReadingsForm;
    const deviationField = `deviation${readingNumber}` as keyof TorqueReadingsForm;
    const defTargetField = `def_target${readingNumber}` as keyof TorqueReadingsForm;
    const defActualField = `def_actual${readingNumber}` as keyof TorqueReadingsForm;
    const defDeviationField = `def_deviation${readingNumber}` as keyof TorqueReadingsForm;
    
    const updatedReadings = { ...readings };

    if (field === 'target') {
      updatedReadings[targetField] = value;
      updatedReadings[defTargetField] = value;
      if (updatedReadings[actualField]) {
        const deviation = calculateDeviation(value, updatedReadings[actualField]);
        updatedReadings[deviationField] = deviation;
        updatedReadings[defDeviationField] = deviation;
      }
    } else if (field === 'actual') {
      updatedReadings[actualField] = value;
      updatedReadings[defActualField] = value;
      if (updatedReadings[targetField]) {
        const deviation = calculateDeviation(updatedReadings[targetField], value);
        updatedReadings[deviationField] = deviation;
        updatedReadings[defDeviationField] = deviation;
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