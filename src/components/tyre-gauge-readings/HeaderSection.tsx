import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeaderSectionProps {
  certNumber: string;
  date: Date | undefined;
  retestDate: Date | undefined;
  status: string;
  onDateChange: (date: Date | undefined) => void;
  onRetestDateChange: (date: Date | undefined) => void;
  onStatusChange: (status: string) => void;
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="certNumber" className="text-sm text-[#C8C8C9]">Certificate Number</Label>
          <Input
            id="certNumber"
            value={certNumber}
            className="h-12 bg-white border-gray-200 placeholder:text-[#C8C8C9]"
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-[#C8C8C9]">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-12 bg-white border-gray-200",
                  !date && "text-[#C8C8C9]"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={onDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-[#C8C8C9]">Retest Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-12 bg-white border-gray-200",
                  !retestDate && "text-[#C8C8C9]"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {retestDate ? format(retestDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={retestDate}
                onSelect={onRetestDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm text-[#C8C8C9]">Status</Label>
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="h-12 bg-white border-gray-200">
              <SelectValue placeholder="Select status" />
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