import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface DatePickerFieldProps {
  label: string;
  date: string;
  onDateChange: (value: string) => void;
}

export const DatePickerField = ({
  label,
  date,
  onDateChange,
}: DatePickerFieldProps) => {
  const formatDisplayDate = (dateString: string | undefined) => {
    if (!dateString) return undefined;
    try {
      // Parse the ISO date string to a Date object
      return new Date(dateString);
    } catch {
      return undefined;
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    // Format the date as ISO string (YYYY-MM-DD)
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    onDateChange(formattedDate);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm text-[#C8C8C9]">{label}</label>
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
            {date ? (
              format(new Date(date), "dd/MM/yyyy")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={formatDisplayDate(date)}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};