import { ReadingsSection } from "../ReadingsSection";
import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";

interface ReadingsDetailsProps {
  readings: TorqueReadingsForm;
  onReadingChange: (index: number, field: string, value: string) => void;
}

export const ReadingsDetails = ({ readings, onReadingChange }: ReadingsDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ReadingsSection
        title="AS FOUND"
        readings={readings}
        onChange={onReadingChange}
      />
      <ReadingsSection
        title="DEFINITIVE"
        readings={readings}
        onChange={onReadingChange}
        readOnly
      />
    </div>
  );
};