import { useIsMobile } from "@/hooks/use-mobile";
import { DatePickerField } from "./form-fields/DatePickerField";

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
  status,
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

  const currentStatus = status || calculateStatus();
  
  return (
    <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
      <div className="grid grid-cols-1 gap-4">
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
          <DatePickerField
            label="Test Date"
            date={date}
            onDateChange={onDateChange}
          />

          <div className="space-y-2">
            <label className="text-sm text-[#C8C8C9]">Status</label>
            <input
              type="text"
              value={currentStatus}
              readOnly
              className={`flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium ${
                currentStatus === "ACTIVE" ? "text-green-500" : "text-red-500"
              }`}
            />
          </div>

          <DatePickerField
            label="Retest Date"
            date={retestDate}
            onDateChange={onRetestDateChange}
          />

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