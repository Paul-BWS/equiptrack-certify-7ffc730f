import { FormField } from "./FormField";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const statusColor = status === "ACTIVE" ? "text-green-500" : "text-red-500";
  
  return (
    <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-4 gap-6'} mb-8`}>
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Test Date</label>
        <div className="relative">
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Status</label>
        <input
          type="text"
          value={status}
          readOnly
          className={`flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium ${statusColor}`}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">Retest Date</label>
        <input
          type="date"
          value={retestDate}
          onChange={(e) => onRetestDateChange(e.target.value)}
          className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">Certificate Number</label>
        <input
          type="text"
          value={certNumber}
          readOnly
          className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
};