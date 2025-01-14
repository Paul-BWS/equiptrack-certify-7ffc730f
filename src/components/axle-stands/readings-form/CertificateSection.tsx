import { DatePickerField } from "@/components/tyre-gauge-readings/form-fields/DatePickerField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CertificateSectionProps {
  date: string;
  retestDate: string;
  certNumber: string;
  status: string;
  onDateChange: (date: string) => void;
  onRetestDateChange: (date: string) => void;
  onStatusChange: (value: string) => void;
}

export const CertificateSection = ({
  date,
  retestDate,
  certNumber,
  status,
  onDateChange,
  onRetestDateChange,
  onStatusChange,
}: CertificateSectionProps) => {
  return (
    <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
      <div className="space-y-2">
        <label className="text-base text-[#C8C8C9]">Certificate Number</label>
        <input
          type="text"
          value={certNumber}
          readOnly
          className="flex h-12 w-full text-base rounded-md border border-gray-200 bg-white px-3 py-2"
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
          <label className="text-base text-[#C8C8C9]">Status</label>
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="h-12 bg-white border-gray-200 text-base">
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