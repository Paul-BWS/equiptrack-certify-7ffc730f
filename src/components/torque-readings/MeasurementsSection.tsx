import { FormField } from "../torque-readings/FormField";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MeasurementsSectionProps {
  min: string;
  max: string;
  units: string;
  result: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  onUnitsChange: (value: string) => void;
  onResultChange: (value: string) => void;
}

export const MeasurementsSection = ({
  min,
  max,
  units,
  result,
  onMinChange,
  onMaxChange,
  onUnitsChange,
  onResultChange,
}: MeasurementsSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
      <FormField
        id="min"
        label="Min"
        type="number"
        value={min}
        onChange={(e) => onMinChange(e.target.value)}
      />
      <FormField
        id="max"
        label="Max"
        type="number"
        value={max}
        onChange={(e) => onMaxChange(e.target.value)}
      />
      <div className="space-y-2">
        <label htmlFor="units" className="text-[#C8C8C9] text-sm">Units</label>
        <Select
          value={units}
          onValueChange={onUnitsChange}
        >
          <SelectTrigger id="units" className="text-sm bg-[#F9F9F9]">
            <SelectValue placeholder="Select units" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nm">Nm</SelectItem>
            <SelectItem value="ft-lb">ft-lb</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label htmlFor="result" className="text-[#C8C8C9] text-sm">Result</label>
        <Select
          value={result}
          onValueChange={onResultChange}
        >
          <SelectTrigger id="result" className={`text-sm ${
            result === 'PASS' ? 'text-green-500' : 'text-red-500'
          }`}>
            <SelectValue placeholder="Select result" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PASS" className="text-green-500">PASS</SelectItem>
            <SelectItem value="FAIL" className="text-red-500">FAIL</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};