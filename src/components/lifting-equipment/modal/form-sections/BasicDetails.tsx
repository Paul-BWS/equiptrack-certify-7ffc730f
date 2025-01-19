import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LiftingEquipmentReadings } from "@/types/lifting-equipment-form";

interface BasicDetailsProps {
  readings: LiftingEquipmentReadings;
  onChange: (field: keyof LiftingEquipmentReadings, value: string) => void;
}

export const BasicDetails = ({ readings, onChange }: BasicDetailsProps) => {
  return (
    <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          name="model"
          render={({ field }) => (
            <Input
              {...field}
              value={readings.model}
              onChange={(e) => onChange("model", e.target.value)}
              placeholder="Enter model"
              className="h-12 bg-white border-gray-200"
            />
          )}
        />
        <FormField
          name="serialNumber"
          render={({ field }) => (
            <Input
              {...field}
              value={readings.serialNumber}
              onChange={(e) => onChange("serialNumber", e.target.value)}
              placeholder="Enter serial number"
              className="h-12 bg-white border-gray-200"
            />
          )}
        />
      </div>
    </div>
  );
};