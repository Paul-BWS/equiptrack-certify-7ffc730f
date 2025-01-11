import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Factory, Globe } from "lucide-react";
import { Company } from "@/types/company";
import { CompanyEditForm } from "@/components/CompanyEditForm";
import { ContactForm } from "@/components/ContactForm";

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">
          {company.name}
        </CardTitle>
        <div className="flex gap-2">
          <ContactForm companyId={company.id} />
          <CompanyEditForm company={company} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xs text-[#B3B3B3] mb-1 flex items-center gap-2">
                <Factory className="h-4 w-4" />
                Industry
              </h3>
              <p className="text-sm">{company.industry}</p>
            </div>
            {company.website && (
              <div>
                <h3 className="text-xs text-[#B3B3B3] mb-1 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </h3>
                <a 
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {company.website}
                </a>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-xs text-[#B3B3B3] mb-1">Site Address</h3>
              <p className="text-sm">{company.address}</p>
            </div>
            {company.useSeparateBillingAddress && (
              <div>
                <h3 className="text-xs text-[#B3B3B3] mb-1">Billing Address</h3>
                <p className="text-sm">{company.billingaddress}</p>
              </div>
            )}
            {company.notes && (
              <div>
                <h3 className="text-xs text-[#B3B3B3] mb-1">Notes</h3>
                <p className="text-sm whitespace-pre-wrap">{company.notes}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};