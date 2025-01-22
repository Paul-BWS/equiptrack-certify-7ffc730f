import { Factory, Globe } from "lucide-react";
import { Company } from "@/types/company";

interface CompanyInfoProps {
  company: Company;
}

export const CompanyInfo = ({ company }: CompanyInfoProps) => {
  // Function to format the full address
  const formatAddress = (company: Company) => {
    const parts = [
      company.address1,
      company.address2,
      company.city,
      company.state,
      company.postcode,
      company.country
    ].filter(Boolean); // This removes any undefined or empty values
    return parts.join(", ");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-blue-50">
          <h3 className="text-xs text-gray-500 mb-1 flex items-center gap-2">
            <Factory className="h-4 w-4 text-[#266bec]" />
            Industry
          </h3>
          <p className="text-sm text-gray-900">{company.industry}</p>
        </div>
        {company.website && (
          <div className="p-4 rounded-lg bg-blue-50">
            <h3 className="text-xs text-gray-500 mb-1 flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#266bec]" />
              Website
            </h3>
            <a 
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#266bec] hover:underline"
            >
              {company.website}
            </a>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-blue-50">
          <h3 className="text-xs text-gray-500 mb-1">Site Address</h3>
          <p className="text-sm text-gray-900">{formatAddress(company)}</p>
        </div>
        {company.useSeparateBillingAddress && (
          <div className="p-4 rounded-lg bg-blue-50">
            <h3 className="text-xs text-gray-500 mb-1">Billing Address</h3>
            <p className="text-sm text-gray-900">{company.billingaddress}</p>
          </div>
        )}
        {company.notes && (
          <div className="p-4 rounded-lg bg-blue-50">
            <h3 className="text-xs text-gray-500 mb-1">Notes</h3>
            <p className="text-sm text-gray-900 whitespace-pre-wrap">{company.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};