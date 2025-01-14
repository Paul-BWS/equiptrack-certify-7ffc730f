import { useStaffMembers } from "@/hooks/useStaffMembers";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerField } from "@/components/tyre-gauge-readings/form-fields/DatePickerField";

interface BasicDetailsSectionProps {
  model: string;
  serialNumber: string;
  engineer?: string;
  date: string;
  retestDate: string;
  result: string;
  onFieldChange: (field: string, value: string) => void;
}

export const BasicDetailsSection = ({
  model,
  serialNumber,
  engineer,
  date,
  retestDate,
  result,
  onFieldChange,
}: BasicDetailsSectionProps) => {
  const { data: staff, isLoading: isLoadingStaff } = useStaffMembers();

  return (
    <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-[#C8C8C9]">Model</label>
          <input
            type="text"
            value={model}
            onChange={(e) => onFieldChange("model", e.target.value)}
            className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-[#C8C8C9]">Serial Number</label>
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => onFieldChange("serialNumber", e.target.value)}
            className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-[#C8C8C9]">Engineer</label>
          <Select 
            value={engineer} 
            onValueChange={(value) => onFieldChange("engineer", value)}
          >
            <SelectTrigger className="h-12 bg-white border-gray-200">
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
                >
                  {engineer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-[#C8C8C9]">Result</label>
          <Select
            value={result}
            onValueChange={(value) => onFieldChange("result", value)}
          >
            <SelectTrigger className="h-12 bg-white border-gray-200">
              <SelectValue placeholder="Select result" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="PASS">Pass</SelectItem>
              <SelectItem value="FAIL">Fail</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePickerField
          label="Test Date"
          date={date}
          onDateChange={(value) => onFieldChange("date", value)}
        />
        <DatePickerField
          label="Retest Date"
          date={retestDate}
          onDateChange={(value) => onFieldChange("retestDate", value)}
        />
      </div>
    </div>
  );
};