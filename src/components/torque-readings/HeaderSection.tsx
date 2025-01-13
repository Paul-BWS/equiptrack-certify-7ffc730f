import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface HeaderSectionProps {
  date: string;
  status: string;
  retestDate: string;
  certNumber: string;
  onDateChange: (value: string) => void;
  onRetestDateChange: (value: string) => void;
}

export const HeaderSection = ({
  date,
  retestDate,
  certNumber,
  onDateChange,
  onRetestDateChange,
}: HeaderSectionProps) => {
  const isMobile = useIsMobile();
  
  const calculateStatus = () => {
    if (!retestDate) return "ACTIVE";
    const today = new Date();
    const retestDateObj = new Date(retestDate);
    return today <= retestDateObj ? "ACTIVE" : "INACTIVE";
  };

  const status = calculateStatus();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    onDateChange(formattedDate);
  };

  const handleRetestDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    onRetestDateChange(formattedDate);
  };

  const formatDisplayDate = (dateString: string | undefined) => {
    if (!dateString) return undefined;
    try {
      return new Date(dateString);
    } catch {
      return undefined;
    }
  };
  
  return (
    <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
      <div className="grid grid-cols-1 gap-4">
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
          <div className="space-y-2">
            <label className="text-sm text-[#C8C8C9]">Test Date</label>
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
                  {formatDisplayDate(date) ? (
                    format(formatDisplayDate(date)!, "dd/MM/yyyy")
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

          <div className="space-y-2">
            <label className="text-sm text-[#C8C8C9]">Status</label>
            <input
              type="text"
              value={status}
              readOnly
              className={`flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium ${
                status === "ACTIVE" ? "text-green-500" : "text-red-500"
              }`}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#C8C8C9]">Retest Date</label>
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
                  {formatDisplayDate(retestDate) ? (
                    format(formatDisplayDate(retestDate)!, "dd/MM/yyyy")
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
                  selected={formatDisplayDate(retestDate)}
                  onSelect={handleRetestDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#C8C8C9]">Certificate Number</label>
            <input
              type="text"
              value={certNumber}
              readOnly
              className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};