import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  onUnitsChange: (value: string) => void;
}

export const MeasurementsSection = ({
  min,
  max,
  units,
  onMinChange,
  onMaxChange,
  onUnitsChange,
}: MeasurementsSectionProps) => {
  return (
    <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="min" className="text-sm text-[#C8C8C9]">Minimum</Label>
          <Input
            id="min"
            value={min}
            onChange={(e) => onMinChange(e.target.value)}
            type="number"
            placeholder="Min pressure"
            className="h-12 bg-white border-gray-200 placeholder:text-[#C8C8C9]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="max" className="text-sm text-[#C8C8C9]">Maximum</Label>
          <Input
            id="max"
            value={max}
            onChange={(e) => onMaxChange(e.target.value)}
            type="number"
            placeholder="Max pressure"
            className="h-12 bg-white border-gray-200 placeholder:text-[#C8C8C9]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="units" className="text-sm text-[#C8C8C9]">Units</Label>
          <Select value={units} onValueChange={onUnitsChange}>
            <SelectTrigger className="h-12 bg-white border-gray-200">
              <SelectValue placeholder="Select units" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="psi">PSI</SelectItem>
              <SelectItem value="bar">BAR</SelectItem>
              <SelectItem value="kpa">kPa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};