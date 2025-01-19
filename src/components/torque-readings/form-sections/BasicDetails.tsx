import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";

interface BasicDetailsProps {
  formData: TorqueReadingsForm;
  onChange: (field: keyof TorqueReadingsForm, value: string) => void;
}

export const BasicDetails = ({ formData, onChange }: BasicDetailsProps) => {
  return (
    <div className="bg-[#F9F9F9] p-6 rounded-lg space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-[#C8C8C9]">Model</label>
        <input
          value={formData.model}
          onChange={(e) => onChange("model", e.target.value)}
          className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
          placeholder="Enter model"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-[#C8C8C9]">Serial Number</label>
        <input
          value={formData.serialNumber}
          onChange={(e) => onChange("serialNumber", e.target.value)}
          className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
          placeholder="Enter serial number"
        />
      </div>
    </div>
  );
};