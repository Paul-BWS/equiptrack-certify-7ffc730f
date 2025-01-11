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
    const newReadings = [...readings.readings];
    newReadings[index] = { ...newReadings[index], [field]: value };

    // Calculate deviation when either target or actual changes
    if (field === 'target' || field === 'actual') {
      const target = field === 'target' ? value : newReadings[index].target;
      const actual = field === 'actual' ? value : newReadings[index].actual;
      
      if (target && actual) {
        newReadings[index].deviation = calculateDeviation(target, actual);
      }
    }

    // Update definitive readings to match the new readings
    const newDefinitiveReadings = newReadings.map(reading => ({
      target: reading.target,
      actual: reading.actual,
      deviation: reading.deviation
    }));

    // Update both readings and definitiveReadings
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