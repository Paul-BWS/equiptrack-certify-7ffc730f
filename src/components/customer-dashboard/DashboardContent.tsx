import { CompanyCard } from "./CompanyCard";
import { ContactsList } from "./ContactsList";
import { EquipmentServiceList } from "./EquipmentServiceList";
import { Company } from "@/types/company";
import { useProfileData } from "@/hooks/useProfileData";
import { useState } from "react";
import { AccessCheck } from "./auth/AccessCheck";
import { ErrorDisplay } from "./error/ErrorDisplay";
import { DashboardLoadingState } from "./loading/LoadingState";

interface DashboardContentProps {
  company: Company;
}

export const DashboardContent = ({ company }: DashboardContentProps) => {
  const { isBWSUser } = useProfileData();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (isLoading) {
    return <DashboardLoadingState />;
  }

  if (error) {
    return (
      <ErrorDisplay 
        title="Unable to Load Dashboard"
        message={error}
        suggestion="If this problem persists, please try refreshing the page or contact support."
      />
    );
  }

  if (!hasAccess) {
    return (
      <ErrorDisplay 
        title="Access Denied"
        message="You don't have permission to view this company's information."
        suggestion="If you believe this is a mistake, please contact your administrator."
      />
    );
  }

  return (
    <>
      <AccessCheck
        company={company}
        isBWSUser={isBWSUser}
        onAccessChange={setHasAccess}
        onError={setError}
        onLoadingChange={setIsLoading}
      />
      <div className="container mx-auto py-6 space-y-6">
        <CompanyCard company={company} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactsList contacts={company.contacts || []} companyId={company.id} />
          <EquipmentServiceList companyId={company.id} />
        </div>
      </div>
    </>
  );
};