import { EquipmentSection } from "../EquipmentSection";
import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";

interface EquipmentDetailsProps {
  readings: TorqueReadingsForm;
  onFieldChange: (field: keyof TorqueReadingsForm, value: string) => void;
}

export const EquipmentDetails = ({ readings, onFieldChange }: EquipmentDetailsProps) => {
  return (
    <EquipmentSection
      model={readings.model}
      serialNumber={readings.serialNumber}
      engineer={readings.engineer}
      sentOn={readings.sentOn}
      onModelChange={(value) => onFieldChange("model", value)}
      onSerialNumberChange={(value) => onFieldChange("serialNumber", value)}
      onEngineerChange={(value) => onFieldChange("engineer", value)}
    />
  );
};