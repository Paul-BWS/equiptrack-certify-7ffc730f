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
    <div className="space-y-4 bg-gray-50 p-6 rounded-lg mt-6">
      <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-6`}>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Min</label>
          <input
            type="number"
            value={min}
            onChange={(e) => onMinChange(e.target.value)}
            className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Max</label>
          <input
            type="number"
            value={max}
            onChange={(e) => onMaxChange(e.target.value)}
            className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Units</label>
          <Select
            value={units}
            onValueChange={onUnitsChange}
          >
            <SelectTrigger className="h-12 bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nm">Nm</SelectItem>
              <SelectItem value="ft-lb">ft-lb</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Result</label>
          <Select
            value={result}
            onValueChange={onResultChange}
          >
            <SelectTrigger className={`h-12 bg-white border-gray-200 ${
              result === 'PASS' ? 'text-green-500' : 'text-red-500'
            }`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PASS" className="text-green-500">PASS</SelectItem>
              <SelectItem value="FAIL" className="text-red-500">FAIL</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};