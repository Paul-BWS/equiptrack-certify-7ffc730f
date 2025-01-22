import { CompanyCard } from "./CompanyCard";
import { ContactsList } from "./ContactsList";
import { EquipmentServiceList } from "./EquipmentServiceList";
import { Company } from "@/types/company";
import { useProfileData } from "@/hooks/useProfileData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface DashboardContentProps {
  company: Company;
}

export const DashboardContent = ({ company }: DashboardContentProps) => {
  const { isBWSUser } = useProfileData();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        if (isBWSUser) {
          setHasAccess(true);
          return;
        }

        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData?.session?.user) {
          setError("Authentication required");
          return;
        }

        const { data: userCompany, error: companyError } = await supabase
          .from('user_companies')
          .select('company_id')
          .eq('user_id', sessionData.session.user.id)
          .eq('company_id', company.id)
          .maybeSingle();

        if (companyError) {
          console.error('Error checking company access:', companyError);
          setError("Error verifying access permissions");
          return;
        }

        setHasAccess(!!userCompany);
      } catch (err) {
        console.error('Error in checkAccess:', err);
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [company.id, isBWSUser]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-gray-200 rounded-lg"></div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="container mx-auto py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You don't have permission to view this company's information.
          </AlertDescription>
        </Alert>
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