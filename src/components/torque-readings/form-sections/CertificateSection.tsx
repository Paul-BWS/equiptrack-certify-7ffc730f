import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";

interface CertificateSectionProps {
  formData: TorqueReadingsForm;
  onChange: (field: keyof TorqueReadingsForm, value: string) => void;
}

export const CertificateSection = ({ formData, onChange }: CertificateSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#F9F9F9] p-6 rounded-lg space-y-4">
        <label className="text-sm text-[#C8C8C9]">Certificate Number</label>
        <input
          type="text"
          value={formData.certNumber}
          readOnly
          className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
};