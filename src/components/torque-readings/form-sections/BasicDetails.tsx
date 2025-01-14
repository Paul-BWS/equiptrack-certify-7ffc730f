import { FormField } from "@/components/torque-readings/FormField";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStaffMembers } from "@/hooks/useStaffMembers";
import { Loader2 } from "lucide-react";
import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";

interface BasicDetailsProps {
  formData: TorqueReadingsForm;
  onChange: (field: keyof TorqueReadingsForm, value: string) => void;
}

export const BasicDetails = ({ formData, onChange }: BasicDetailsProps) => {
  const { data: staff, isLoading: isLoadingStaff } = useStaffMembers();

  return (
    <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-base text-[#C8C8C9]">Model</label>
          <input
            value={formData.model}
            onChange={(e) => onChange("model", e.target.value)}
            className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base"
            placeholder="Enter model"
          />
        </div>
        <div className="space-y-2">
          <label className="text-base text-[#C8C8C9]">Serial Number</label>
          <input
            value={formData.serialNumber}
            onChange={(e) => onChange("serialNumber", e.target.value)}
            className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base"
            placeholder="Enter serial number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-base text-[#C8C8C9]">Engineer</label>
          <Select
            value={formData.engineer}
            onValueChange={(value) => onChange("engineer", value)}
          >
            <SelectTrigger className="h-12 bg-white border-gray-200">
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
        <div className="space-y-2">
          <label className="text-base text-[#C8C8C9]">Result</label>
          <Select
            value={formData.result}
            onValueChange={(value) => onChange("result", value)}
          >
            <SelectTrigger className="h-12 bg-white border-gray-200">
              <SelectValue placeholder="Select result" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PASS">Pass</SelectItem>
              <SelectItem value="FAIL">Fail</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};