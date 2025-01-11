import { Reading } from "@/types/equipment";
import { calculateDeviation } from "@/utils/deviationCalculator";

interface ReadingsHandlerProps {
  readings: any;
  setReadings: (readings: any) => void;
}

export const ReadingsHandler = ({ readings, setReadings }: ReadingsHandlerProps) => {
  const handleReadingChange = (index: number, field: string, value: string) => {
    const newReadings = [...readings.readings];
    newReadings[index] = { ...newReadings[index], [field]: value };

    if (field === 'target' || field === 'actual') {
      const target = field === 'target' ? value : newReadings[index].target;
      const actual = field === 'actual' ? value : newReadings[index].actual;
      newReadings[index].deviation = calculateDeviation(target, actual);
    }

    // Copy the updated readings to definitiveReadings
    const newDefinitiveReadings = newReadings.map(reading => ({
      target: reading.target,
      actual: reading.actual,
      deviation: reading.deviation
    }));

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