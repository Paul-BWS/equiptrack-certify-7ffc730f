import { CompanyCard } from "./CompanyCard";
import { ContactsList } from "./ContactsList";
import { EquipmentServiceList } from "./EquipmentServiceList";
import { Company } from "@/types/company";
import { useProfileData } from "@/hooks/useProfileData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

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
          setIsLoading(false);
          return;
        }

        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          setError("Please sign in again to continue");
          toast.error("Your session has expired. Please sign in again.");
          return;
        }

        if (!sessionData?.session) {
          setError("Please sign in to continue");
          return;
        }

        const maxRetries = 3;
        let retryCount = 0;
        let success = false;

        while (retryCount < maxRetries && !success) {
          try {
            const { data: userCompany, error: companyError } = await supabase
              .from('user_companies')
              .select('company_id')
              .eq('user_id', sessionData.session.user.id)
              .eq('company_id', company.id)
              .maybeSingle();

            if (companyError) {
              throw companyError;
            }

            setHasAccess(!!userCompany);
            success = true;
          } catch (fetchError) {
            retryCount++;
            if (retryCount === maxRetries) {
              console.error('Error checking company access:', fetchError);
              setError("Unable to verify access. Please try again later.");
              toast.error("Connection error. Please check your internet connection.");
            } else {
              // Wait before retrying (exponential backoff)
              await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
            }
          }
        }
      } catch (err) {
        console.error('Error in checkAccess:', err);
        setError("Unable to load company information");
        toast.error("An error occurred while loading company information");
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
          <AlertTitle>Unable to Load Dashboard</AlertTitle>
          <AlertDescription className="space-y-4">
            <p>{error}</p>
            <p className="text-sm">
              If this problem persists, please try refreshing the page or contact support.
            </p>
          </AlertDescription>
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
            If you believe this is a mistake, please contact your administrator.
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