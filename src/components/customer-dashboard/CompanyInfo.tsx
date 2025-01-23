import { Factory } from "lucide-react";
import { Company } from "@/types/company";

interface CompanyInfoProps {
  company: Company;
}

export const CompanyInfo = ({ company }: CompanyInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-blue-50">
          <h3 className="text-xs text-gray-500 mb-1 flex items-center gap-2">
            <Factory className="h-4 w-4 text-[#4c6fbf]" />
            Industry
          </h3>
          <p className="text-sm text-gray-900">{company.industry}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-blue-50">
          <h3 className="text-xs text-gray-500 mb-1">Site Address</h3>
          <p className="text-sm text-gray-900">{company.address}</p>
        </div>
      </div>
    </div>
  );
};