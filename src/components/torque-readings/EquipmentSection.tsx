import { FormField } from "../torque-readings/FormField";
import { useIsMobile } from "@/hooks/use-mobile";

interface EquipmentSectionProps {
  model: string;
  serialNumber: string;
  engineer: string;
  sentOn: string;
  onModelChange: (value: string) => void;
  onSerialNumberChange: (value: string) => void;
  onEngineerChange: (value: string) => void;
}

export const EquipmentSection = ({
  model,
  serialNumber,
  engineer,
  sentOn,
  onModelChange,
  onSerialNumberChange,
  onEngineerChange,
}: EquipmentSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
        <FormField
          id="model"
          label="Model"
          value={model}
          onChange={(e) => onModelChange(e.target.value)}
        />
        <FormField
          id="serialNumber"
          label="Serial Number"
          value={serialNumber}
          onChange={(e) => onSerialNumberChange(e.target.value)}
        />
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
        <FormField
          id="engineer"
          label="Engineer"
          value={engineer}
          onChange={(e) => onEngineerChange(e.target.value)}
        />
        <FormField
          id="sentOn"
          label="Sent On"
          value={sentOn}
          readOnly
          className="bg-gray-100"
        />
      </div>
    </>
  );
};