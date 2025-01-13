import { Factory, Globe } from "lucide-react";
import { Company } from "@/types/company";

interface CompanyInfoProps {
  company: Company;
}

export const CompanyInfo = ({ company }: CompanyInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="p-4 rounded-lg border border-[#E5DEFF]/20 bg-[#6E59A5]">
          <h3 className="text-xs text-[#E5DEFF] mb-1 flex items-center gap-2">
            <Factory className="h-4 w-4" />
            Industry
          </h3>
          <p className="text-sm text-white">{company.industry}</p>
        </div>
        {company.website && (
          <div className="p-4 rounded-lg border border-[#E5DEFF]/20 bg-[#6E59A5]">
            <h3 className="text-xs text-[#E5DEFF] mb-1 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Website
            </h3>
            <a 
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#E5DEFF] hover:underline"
            >
              {company.website}
            </a>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <div className="p-4 rounded-lg border border-[#E5DEFF]/20 bg-[#6E59A5]">
          <h3 className="text-xs text-[#E5DEFF] mb-1">Site Address</h3>
          <p className="text-sm text-white">{company.address}</p>
        </div>
        {company.useSeparateBillingAddress && (
          <div className="p-4 rounded-lg border border-[#E5DEFF]/20 bg-[#6E59A5]">
            <h3 className="text-xs text-[#E5DEFF] mb-1">Billing Address</h3>
            <p className="text-sm text-white">{company.billingaddress}</p>
          </div>
        )}
        {company.notes && (
          <div className="p-4 rounded-lg border border-[#E5DEFF]/20 bg-[#6E59A5]">
            <h3 className="text-xs text-[#E5DEFF] mb-1">Notes</h3>
            <p className="text-sm text-white whitespace-pre-wrap">{company.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};