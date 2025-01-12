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
    <div className="space-y-4 bg-gray-50 p-6 rounded-lg mt-6">
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Model</label>
          <input
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
            placeholder="Enter model"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Serial Number</label>
          <input
            value={serialNumber}
            onChange={(e) => onSerialNumberChange(e.target.value)}
            className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
            placeholder="Enter serial number"
          />
        </div>
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Engineer</label>
          <Select
            value={engineer}
            onValueChange={onEngineerChange}
          >
            <SelectTrigger className="h-12 bg-white border-gray-200">
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
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Sent On</label>
          <input
            value={sentOn}
            readOnly
            className="flex h-12 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
};