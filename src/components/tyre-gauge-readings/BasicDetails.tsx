import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ENGINEERS = [
  "Paul Jones",
  "Connor Hill",
  "Tom Hannon",
  "Mark Allen",
  "Dominic Jones"
];

interface BasicDetailsProps {
  model: string;
  serialNumber: string;
  engineer: string;
  onModelChange: (value: string) => void;
  onSerialNumberChange: (value: string) => void;
  onEngineerChange: (value: string) => void;
}

export const BasicDetails = ({
  model,
  serialNumber,
  engineer,
  onModelChange,
  onSerialNumberChange,
  onEngineerChange,
}: BasicDetailsProps) => {
  const handleEngineerChange = (value: string) => {
    onEngineerChange(value);
  };

  return (
    <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="model" className="text-sm text-[#C8C8C9]">Model</Label>
          <Input
            id="model"
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            placeholder="e.g. Halfords"
            className="h-12 bg-white border-gray-200 placeholder:text-[#C8C8C9]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="serialNumber" className="text-sm text-[#C8C8C9]">Serial Number</Label>
          <Input
            id="serialNumber"
            value={serialNumber}
            onChange={(e) => onSerialNumberChange(e.target.value)}
            placeholder="e.g. QAR 127"
            className="h-12 bg-white border-gray-200 placeholder:text-[#C8C8C9]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="engineer" className="text-sm text-[#C8C8C9]">Engineer</Label>
          <Select 
            value={engineer} 
            onValueChange={handleEngineerChange}
            name="engineer"
          >
            <SelectTrigger 
              id="engineer"
              className="h-12 bg-white border-gray-200 placeholder:text-[#C8C8C9]"
            >
              <SelectValue placeholder="Select an engineer" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ENGINEERS.map((eng) => (
                <SelectItem 
                  key={eng} 
                  value={eng}
                  className="cursor-pointer"
                >
                  {eng}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};