import { CompanyCard } from "./CompanyCard";
import { ContactsList } from "@/components/ContactsList";
import { Company } from "@/types/company";

interface AdminDashboardContentProps {
  company: Company;
}

export const AdminDashboardContent = ({ company }: AdminDashboardContentProps) => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <CompanyCard company={company} />
      <ContactsList contacts={company.contacts || []} companyId={company.id} />
    </div>
  );
};