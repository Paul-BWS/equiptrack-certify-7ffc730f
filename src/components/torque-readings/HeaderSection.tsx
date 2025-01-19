import { DatePickerField } from "./form-fields/DatePickerField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStaffMembers } from "@/hooks/useStaffMembers";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

interface HeaderSectionProps {
  certNumber: string;
  date: string;
  retestDate: string;
  status: string;
  engineer: string;
  onDateChange: (date: string) => void;
  onStatusChange?: (value: string) => void;
  onEngineerChange?: (value: string) => void;
}

export const HeaderSection = ({
  certNumber,
  date,
  retestDate,
  status,
  engineer,
  onDateChange,
  onStatusChange,
  onEngineerChange,
}: HeaderSectionProps) => {
  const { data: staff, isLoading: isLoadingStaff } = useStaffMembers();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label className="text-base text-[#C8C8C9]">Certificate Number</label>
          <input
            type="text"
            value={certNumber}
            readOnly
            className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-base text-[#C8C8C9]">Test Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-base text-[#C8C8C9]">Retest Date</label>
            <input
              type="text"
              value={format(new Date(retestDate), 'dd MMM yyyy')}
              readOnly
              className="flex h-12 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-base"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-base text-[#C8C8C9]">Engineer</label>
            <Select value={engineer} onValueChange={onEngineerChange}>
              <SelectTrigger className="h-12 bg-white border-gray-200 text-base">
                {isLoadingStaff ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading engineers...</span>
                  </div>
                ) : (
                  <SelectValue placeholder="Select an engineer" />
                )}
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                {staff?.map((engineer) => (
                  <SelectItem key={engineer.id} value={engineer.name}>
                    {engineer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-base text-[#C8C8C9]">Status</label>
            <Select value={status} onValueChange={onStatusChange}>
              <SelectTrigger className="h-12 bg-white border-gray-200 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};