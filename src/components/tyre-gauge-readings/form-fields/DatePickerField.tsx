import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

interface DatePickerFieldProps {
  label: string;
  date: string | undefined;
  onDateChange: (date: string) => void;
}

export const DatePickerField = ({
  label,
  date,
  onDateChange,
}: DatePickerFieldProps) => {
  const [inputValue, setInputValue] = useState(date ? format(new Date(date), "yyyy-MM-dd") : "");

  const handleManualInput = (value: string) => {
    setInputValue(value);
    if (isValidDate(value)) {
      onDateChange(value);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    setInputValue(formattedDate);
    onDateChange(formattedDate);
  };

  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  };

  return (
    <div className="space-y-2">
      <label className="text-sm text-[#C8C8C9]">{label}</label>
      <div className="flex gap-2">
        <Input
          type="date"
          value={inputValue}
          onChange={(e) => handleManualInput(e.target.value)}
          className={cn(
            "flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm",
            !date && "text-[#C8C8C9]"
          )}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-12 w-12 rounded-md border border-gray-200 p-0"
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date ? new Date(date) : undefined}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};