import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Company } from "@/types/company";

interface AccessCheckProps {
  company: Company;
  isBWSUser: boolean;
  onAccessChange: (hasAccess: boolean) => void;
  onError: (error: string) => void;
  onLoadingChange: (isLoading: boolean) => void;
}

export const AccessCheck = ({ 
  company, 
  isBWSUser, 
  onAccessChange, 
  onError,
  onLoadingChange 
}: AccessCheckProps) => {
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    const checkAccess = async () => {
      try {
        // If user is BWS user, they have access to everything
        if (isBWSUser) {
          onAccessChange(true);
          onLoadingChange(false);
          return;
        }

        // Check session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          onError("Your session has expired. Please sign in again.");
          toast.error("Session expired. Please sign in again.");
          onLoadingChange(false);
          return;
        }

        if (!sessionData?.session) {
          onError("Please sign in to continue");
          onLoadingChange(false);
          return;
        }

        // Check company access with retry logic
        const checkCompanyAccess = async () => {
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

            onAccessChange(!!userCompany);
            onLoadingChange(false);
            setRetryCount(0); // Reset retry count on success
          } catch (error) {
            console.error('Error checking company access:', error);
            
            if (retryCount < maxRetries) {
              // Exponential backoff
              const delay = Math.min(1000 * Math.pow(2, retryCount), 8000);
              setRetryCount(prev => prev + 1);
              
              console.log(`Retrying in ${delay}ms... (Attempt ${retryCount + 1}/${maxRetries})`);
              toast.error(`Connection issue. Retrying... (${retryCount + 1}/${maxRetries})`);
              
              setTimeout(checkCompanyAccess, delay);
            } else {
              onError("Unable to verify access. Please check your internet connection and try again.");
              onLoadingChange(false);
              toast.error("Connection error. Please refresh the page or try again later.");
            }
          }
        };

        await checkCompanyAccess();

      } catch (err) {
        console.error('Error in checkAccess:', err);
        onError("Unable to load company information. Please try again later.");
        onLoadingChange(false);
        toast.error("An error occurred while loading company information");
      }
    };

    checkAccess();
  }, [company.id, isBWSUser, onAccessChange, onError, onLoadingChange, retryCount]);

  return null;
};