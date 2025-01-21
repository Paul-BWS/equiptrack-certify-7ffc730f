import { CompanyCard } from "./CompanyCard";
import { ContactsList } from "./ContactsList";
import { EquipmentServiceList } from "./EquipmentServiceList";
import { Company } from "@/types/company";
import { useProfileData } from "@/hooks/useProfileData";

interface DashboardContentProps {
  company: Company;
}

export const DashboardContent = ({ company }: DashboardContentProps) => {
  const { isBWSUser } = useProfileData();

  // If user is not from BWS and not from this company, show access denied
  if (!isBWSUser && company.name !== 'Steer Commercial') {
    return (
      <div className="container mx-auto py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold">Access Denied</h2>
          <p className="text-red-600">You don't have permission to view this company's information.</p>
        </div>
      </div>
    );
  }

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