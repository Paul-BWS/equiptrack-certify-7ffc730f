import { FormField } from "../torque-readings/FormField";
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
  
  // Calculate status based on retest date
  const calculateStatus = () => {
    if (!retestDate) return "ACTIVE";
    const today = new Date();
    const retestDateObj = new Date(retestDate);
    return today <= retestDateObj ? "ACTIVE" : "INACTIVE";
  };

  const status = calculateStatus();
  const statusColor = status === "ACTIVE" ? "text-green-500" : "text-red-500";
  
  return (
    <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-4 gap-4'}`}>
      <FormField
        id="date"
        label="Test Date"
        type="date"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        showCalendar
      />
      <FormField
        id="status"
        label="Status"
        value={status}
        readOnly
        className={`font-medium ${statusColor}`}
      />
      <FormField
        id="retestDate"
        label="Retest Date"
        type="date"
        value={retestDate}
        onChange={(e) => onRetestDateChange(e.target.value)}
        showCalendar
      />
      <FormField
        id="certNumber"
        label="Certificate Number"
        value={certNumber}
        readOnly
      />
    </div>
  );
};