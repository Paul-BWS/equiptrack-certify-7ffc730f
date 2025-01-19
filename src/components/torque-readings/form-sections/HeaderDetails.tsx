import { HeaderSection } from "../HeaderSection";
import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";

interface HeaderDetailsProps {
  readings: TorqueReadingsForm;
  onFieldChange: (field: keyof TorqueReadingsForm, value: string) => void;
}

export const HeaderDetails = ({ readings, onFieldChange }: HeaderDetailsProps) => {
  return (
    <HeaderSection
      date={readings.date}
      retestDate={readings.retestDate}
      certNumber={readings.certNumber}
      status={readings.status}
      engineer={readings.engineer}
      onDateChange={(value) => onFieldChange("date", value)}
      onStatusChange={(value) => onFieldChange("status", value)}
      onEngineerChange={(value) => onFieldChange("engineer", value)}
    />
  );
};