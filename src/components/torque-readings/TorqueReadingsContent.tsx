import { Button } from "@/components/ui/button";
import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";
import { HeaderDetails } from "./form-sections/HeaderDetails";
import { EquipmentDetails } from "./form-sections/EquipmentDetails";
import { MeasurementDetails } from "./form-sections/MeasurementDetails";
import { ReadingsDetails } from "./form-sections/ReadingsDetails";
import { NotesSection } from "./NotesSection";

interface TorqueReadingsContentProps {
  readings: TorqueReadingsForm;
  setReadings: (readings: TorqueReadingsForm) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleSave: () => void;
  isSaving: boolean;
  handleReadingChange: (index: number, field: string, value: string) => void;
}

export const TorqueReadingsContent = ({
  readings,
  setReadings,
  handleSubmit,
  handleSave,
  isSaving,
  handleReadingChange,
}: TorqueReadingsContentProps) => {
  const handleFieldChange = (field: keyof TorqueReadingsForm, value: string) => {
    setReadings({ ...readings, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <HeaderDetails 
        readings={readings}
        onFieldChange={handleFieldChange}
      />

      <EquipmentDetails
        readings={readings}
        onFieldChange={handleFieldChange}
      />

      <MeasurementDetails
        readings={readings}
        onFieldChange={handleFieldChange}
      />

      <ReadingsDetails
        readings={readings}
        onReadingChange={handleReadingChange}
      />

      <NotesSection
        notes={readings.notes}
        onChange={(value) => handleFieldChange("notes", value)}
      />

      <div className="flex justify-end gap-4 mt-8">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-white hover:bg-gray-50 border-gray-200"
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
        <Button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Generate Certificate
        </Button>
      </div>
    </form>
  );
};