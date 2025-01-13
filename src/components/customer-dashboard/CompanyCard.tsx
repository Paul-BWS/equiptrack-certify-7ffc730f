import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Company } from "@/types/company";
import { CompanyEditForm } from "@/components/CompanyEditForm";
import { ContactForm } from "@/components/ContactForm";
import { DeleteCompanyButton } from "./DeleteCompanyButton";
import { CompanyInfo } from "./CompanyInfo";

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-gray-900">
          {company.name}
        </CardTitle>
        <div className="flex gap-2">
          <ContactForm companyId={company.id} />
          <CompanyEditForm company={company} />
          <DeleteCompanyButton companyId={company.id} companyName={company.name} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <CompanyInfo company={company} />
      </CardContent>
    </Card>
  );
};