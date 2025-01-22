import { CompanyCard } from "./CompanyCard";
import { ContactsList } from "./ContactsList";
import { EquipmentServiceList } from "./EquipmentServiceList";
import { Company } from "@/types/company";

interface DashboardContentProps {
  company: Company;
}

export const DashboardContent = ({ company }: DashboardContentProps) => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <CompanyCard company={company} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContactsList contacts={company.contacts || []} companyId={company.id} />
        <EquipmentServiceList companyId={company.id} />
      </div>
    </div>
  );
};