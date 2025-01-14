import { Reading } from "@/types/equipment";
import { FormField } from "@/components/torque-readings/FormField";
import { calculateDeviation } from "@/utils/certificateDataPreparation";
import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";

interface ReadingsSectionProps {
  formData: TorqueReadingsForm;
  onChange: (field: keyof TorqueReadingsForm, value: string) => void;
}

export const ReadingsSection = ({ formData, onChange }: ReadingsSectionProps) => {
  const handleReadingChange = (index: number, field: string, value: string) => {
    const readingNumber = (index + 1).toString();
    const fieldName = `${field}${readingNumber}` as keyof TorqueReadingsForm;
    const defFieldName = `def_${field}${readingNumber}` as keyof TorqueReadingsForm;
    
    onChange(fieldName, value);
    
    // Update definitive readings
    onChange(defFieldName, value);
    
    // Calculate and update deviation if both target and actual are present
    if (field === 'target' || field === 'actual') {
      const targetField = `target${readingNumber}` as keyof TorqueReadingsForm;
      const actualField = `actual${readingNumber}` as keyof TorqueReadingsForm;
      const deviationField = `deviation${readingNumber}` as keyof TorqueReadingsForm;
      const defDeviationField = `def_deviation${readingNumber}` as keyof TorqueReadingsForm;
      
      const target = field === 'target' ? value : formData[targetField];
      const actual = field === 'actual' ? value : formData[actualField];
      
      if (target && actual) {
        const deviation = calculateDeviation(target, actual);
        onChange(deviationField, deviation);
        onChange(defDeviationField, deviation);
      }
    }
  };

  return (
    <div className="space-y-6">
      {[0, 1, 2].map((index) => {
        const readingNumber = (index + 1).toString();
        return (
          <div key={index} className="grid grid-cols-3 gap-4">
            <FormField
              id={`target-${index}`}
              label="Target"
              value={formData[`target${readingNumber}` as keyof TorqueReadingsForm]}
              onChange={(e) => handleReadingChange(index, "target", e.target.value)}
              type="number"
            />
            <FormField
              id={`actual-${index}`}
              label="Actual"
              value={formData[`actual${readingNumber}` as keyof TorqueReadingsForm]}
              onChange={(e) => handleReadingChange(index, "actual", e.target.value)}
              type="number"
            />
            <FormField
              id={`deviation-${index}`}
              label="Deviation (%)"
              value={formData[`deviation${readingNumber}` as keyof TorqueReadingsForm]}
              readOnly
              className="bg-gray-50"
            />
          </div>
        );
      })}
    </div>
  );
};