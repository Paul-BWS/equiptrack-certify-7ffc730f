import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (date) {
      try {
        const parsedDate = new Date(date);
        setInputValue(format(parsedDate, "dd-MM-yyyy"));
      } catch (error) {
        console.error("Error formatting date:", error);
      }
    }
  }, [date]);

  const handleManualInput = (value: string) => {
    setInputValue(value);
    try {
      const parsedDate = parse(value, "dd-MM-yyyy", new Date());
      if (isValidDate(parsedDate)) {
        onDateChange(format(parsedDate, "yyyy-MM-dd"));
      }
    } catch (error) {
      console.error("Error parsing manual date input:", error);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    try {
      setInputValue(format(selectedDate, "dd-MM-yyyy"));
      onDateChange(format(selectedDate, "yyyy-MM-dd"));
    } catch (error) {
      console.error("Error handling date selection:", error);
    }
  };

  const isValidDate = (date: Date) => {
    return date instanceof Date && !isNaN(date.getTime());
  };

  return (
    <div className="space-y-2">
      <label className="text-sm text-[#C8C8C9]">{label}</label>
      <div className="flex gap-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => handleManualInput(e.target.value)}
          placeholder="dd-MM-yyyy"
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