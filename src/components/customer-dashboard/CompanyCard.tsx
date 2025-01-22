import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Company } from "@/types/company";
import { CompanyInfo } from "./CompanyInfo";

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          {company.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <CompanyInfo company={company} />
      </CardContent>
    </Card>
  );
};