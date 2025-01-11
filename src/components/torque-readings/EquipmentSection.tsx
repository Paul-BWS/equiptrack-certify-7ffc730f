import { FormField } from "./FormField";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EquipmentSectionProps {
  model: string;
  serialNumber: string;
  engineer: string;
  sentOn: string;
  onModelChange: (value: string) => void;
  onSerialNumberChange: (value: string) => void;
  onEngineerChange: (value: string) => void;
}

// This would ideally come from an API or database
const ENGINEERS = [
  "John Smith",
  "Sarah Johnson",
  "Michael Brown",
  "Emma Wilson",
  "James Davis",
  "Lisa Anderson",
  "Robert Taylor",
  "Patricia Martinez",
  "David Thompson",
  "Jennifer Garcia"
];

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
        <div className="space-y-2">
          <label htmlFor="engineer" className="text-sm font-medium">
            Engineer
          </label>
          <Select
            value={engineer}
            onValueChange={onEngineerChange}
          >
            <SelectTrigger id="engineer" className="w-full">
              <SelectValue placeholder="Select an engineer" />
            </SelectTrigger>
            <SelectContent>
              {ENGINEERS.map((eng) => (
                <SelectItem key={eng} value={eng}>
                  {eng}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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