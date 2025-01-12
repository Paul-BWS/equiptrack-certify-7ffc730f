import { FormField } from "@/components/torque-readings/FormField";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CertificateSectionProps {
  formData: {
    date: string;
    retestDate: string;
    certNumber: string;
    result: string;
  };
  onChange: (field: string, value: string) => void;
}

export const CertificateSection = ({ formData, onChange }: CertificateSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="date"
          label="Test Date"
          value={formData.date}
          onChange={(e) => onChange("date", e.target.value)}
          type="date"
          showCalendar
        />
        <FormField
          id="retestDate"
          label="Retest Date"
          value={formData.retestDate}
          onChange={(e) => onChange("retestDate", e.target.value)}
          type="date"
          showCalendar
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="certNumber"
          label="Certificate Number"
          value={formData.certNumber}
          readOnly
          className="bg-gray-50"
        />
        <div className="space-y-2">
          <label htmlFor="result" className="text-sm text-[#C8C8C9]">
            Result
          </label>
          <Select
            value={formData.result}
            onValueChange={(value) => onChange("result", value)}
          >
            <SelectTrigger id="result">
              <SelectValue />
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