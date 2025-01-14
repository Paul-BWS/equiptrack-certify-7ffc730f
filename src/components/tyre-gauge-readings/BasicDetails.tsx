import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStaffMembers } from "@/hooks/useStaffMembers";
import { Loader2 } from "lucide-react";

interface BasicDetailsProps {
  model: string;
  serialNumber: string;
  engineer: string;
  result: string;
  onModelChange: (value: string) => void;
  onSerialNumberChange: (value: string) => void;
  onEngineerChange: (value: string) => void;
  onResultChange: (value: string) => void;
}

export const BasicDetails = ({
  model,
  serialNumber,
  engineer,
  result,
  onModelChange,
  onSerialNumberChange,
  onEngineerChange,
  onResultChange,
}: BasicDetailsProps) => {
  const { data: staff, isLoading: isLoadingStaff } = useStaffMembers();

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
            onValueChange={onEngineerChange}
            name="engineer"
          >
            <SelectTrigger 
              id="engineer"
              className="h-12 bg-white border-gray-200 placeholder:text-[#C8C8C9]"
            >
              {isLoadingStaff ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading engineers...</span>
                </div>
              ) : (
                <SelectValue placeholder="Select an engineer" />
              )}
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              {staff?.map((engineer) => (
                <SelectItem 
                  key={engineer.id} 
                  value={engineer.name}
                  className="cursor-pointer"
                >
                  {engineer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="result" className="text-sm text-[#C8C8C9]">Result</Label>
          <Select 
            value={result} 
            onValueChange={onResultChange}
            name="result"
          >
            <SelectTrigger 
              id="result"
              className="h-12 bg-white border-gray-200 placeholder:text-[#C8C8C9]"
            >
              <SelectValue placeholder="Select result" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="PASS">Pass</SelectItem>
              <SelectItem value="FAIL">Fail</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};