import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Company } from "@/types/company";

interface CompanySelectProps {
  companies: Company[];
  selectedCompany: string;
  onCompanyChange: (value: string) => void;
}

export const CompanySelect = ({
  companies,
  selectedCompany,
  onCompanyChange,
}: CompanySelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="company">Company</Label>
      <Select value={selectedCompany} onValueChange={onCompanyChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a company" />
        </SelectTrigger>
        <SelectContent position="popper" className="w-full z-50 bg-white">
          {companies.map((company) => (
            <SelectItem key={company.id} value={company.id}>
              {company.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};