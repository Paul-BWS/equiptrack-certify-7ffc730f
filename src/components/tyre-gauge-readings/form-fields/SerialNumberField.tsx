import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SerialNumberFieldProps {
  serialNumber: string;
  onSerialNumberChange: (value: string) => void;
}

export const SerialNumberField = ({ serialNumber, onSerialNumberChange }: SerialNumberFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="serialNumber" className="text-sm text-[#C8C8C9]">Serial Number</Label>
      <Input
        id="serialNumber"
        value={serialNumber}
        onChange={(e) => onSerialNumberChange(e.target.value)}
        placeholder="e.g. QAR 127"
        className="h-12 bg-white border-gray-200 placeholder:text-[#C8C8C9]"
      />
    </div>
  );
};