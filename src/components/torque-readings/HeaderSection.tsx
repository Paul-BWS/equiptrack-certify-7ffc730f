import { useIsMobile } from "@/hooks/use-mobile";
import { addDays } from "date-fns";

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

  const handleDateChange = (newDate: string) => {
    onDateChange(newDate);
    
    // Calculate retest date (364 days from test date)
    if (newDate) {
      const testDate = new Date(newDate);
      const newRetestDate = addDays(testDate, 364);
      onRetestDateChange(newRetestDate.toISOString().split('T')[0]);
    }
  };

  const status = calculateStatus();
  
  return (
    <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
      <div className="grid grid-cols-1 gap-4">
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
          <div className="space-y-2 w-full">
            <label className="text-sm text-[#C8C8C9]">Test Date</label>
            <div className="relative w-full">
              <input
                type="date"
                value={date}
                onChange={(e) => handleDateChange(e.target.value)}
                className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
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
            <div className="relative w-full">
              <input
                type="date"
                value={retestDate}
                onChange={(e) => onRetestDateChange(e.target.value)}
                className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#C8C8C9]">Certificate Number</label>
            <input
              type="text"
              value={certNumber}
              readOnly
              className="flex h-12 w-full rounded-md border border-gray-200 bg-[#F9F9F9] px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};