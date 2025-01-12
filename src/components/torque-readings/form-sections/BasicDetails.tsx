import { FormField } from "@/components/torque-readings/FormField";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStaffMembers } from "@/hooks/useStaffMembers";
import { Loader2 } from "lucide-react";

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

export const BasicDetails = ({ formData, onChange }: BasicDetailsProps) => {
  const { data: staff, isLoading: isLoadingStaff } = useStaffMembers();

  return (
    <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
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
            <SelectTrigger id="engineer" className="h-12 bg-white border-gray-200">
              {isLoadingStaff ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading engineers...</span>
                </div>
              ) : (
                <SelectValue placeholder="Select an engineer" />
              )}
            </SelectTrigger>
            <SelectContent>
              {staff?.map((engineer) => (
                <SelectItem key={engineer.id} value={engineer.name}>
                  {engineer.name}
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
            <SelectTrigger id="units" className="h-12 bg-white border-gray-200">
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