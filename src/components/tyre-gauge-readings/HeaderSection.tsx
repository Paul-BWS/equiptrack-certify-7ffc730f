import { DatePickerField } from "./form-fields/DatePickerField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

interface HeaderSectionProps {
  certNumber: string;
  date: string | undefined;
  retestDate: string | undefined;
  status: string;
  onDateChange: (date: string) => void;
  onRetestDateChange: (date: string) => void;
  onStatusChange: (value: string) => void;
}

export const HeaderSection = ({
  certNumber,
  date,
  retestDate,
  status,
  onDateChange,
  onRetestDateChange,
  onStatusChange,
}: HeaderSectionProps) => {
  return (
    <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
      <div className="space-y-2">
        <label className="text-sm text-[#C8C8C9]">Certificate Number</label>
        <input
          type="text"
          value={certNumber}
          readOnly
          className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DatePickerField
          label="Date"
          date={date}
          onDateChange={onDateChange}
        />
        
        <DatePickerField
          label="Retest Date"
          date={retestDate}
          onDateChange={onRetestDateChange}
        />

        <div className="space-y-2">
          <label className="text-sm text-[#C8C8C9]">Status</label>
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="h-12 bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};