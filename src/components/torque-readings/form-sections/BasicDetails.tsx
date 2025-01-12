import { FormField } from "@/components/torque-readings/FormField";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicDetailsProps {
  formData: {
    model: string;
    serialNumber: string;
    engineer: string;
    min: string;
    max: string;
    units: string;
  };
  onChange: (field: string, value: string) => void;
}

const ENGINEERS = [
  "John Smith",
  "Sarah Johnson",
  "Michael Brown",
  "Emma Wilson",
  "James Davis",
  "Lisa Anderson",
  "Robert Taylor",
  "Patricia Martinez",
  "David Thompson",
  "Jennifer Garcia"
];

export const BasicDetails = ({ formData, onChange }: BasicDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="model"
          label="Model"
          value={formData.model}
          onChange={(e) => onChange("model", e.target.value)}
        />
        <FormField
          id="serialNumber"
          label="Serial Number"
          value={formData.serialNumber}
          onChange={(e) => onChange("serialNumber", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="engineer" className="text-sm text-[#C8C8C9]">
            Engineer
          </label>
          <Select
            value={formData.engineer}
            onValueChange={(value) => onChange("engineer", value)}
          >
            <SelectTrigger id="engineer">
              <SelectValue placeholder="Select an engineer" />
            </SelectTrigger>
            <SelectContent>
              {ENGINEERS.map((eng) => (
                <SelectItem key={eng} value={eng}>
                  {eng}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          id="min"
          label="Min Torque"
          value={formData.min}
          onChange={(e) => onChange("min", e.target.value)}
          type="number"
        />
        <FormField
          id="max"
          label="Max Torque"
          value={formData.max}
          onChange={(e) => onChange("max", e.target.value)}
          type="number"
        />
        <div className="space-y-2">
          <label htmlFor="units" className="text-sm text-[#C8C8C9]">
            Units
          </label>
          <Select
            value={formData.units}
            onValueChange={(value) => onChange("units", value)}
          >
            <SelectTrigger id="units">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nm">Nm</SelectItem>
              <SelectItem value="ftlb">ft/lb</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};