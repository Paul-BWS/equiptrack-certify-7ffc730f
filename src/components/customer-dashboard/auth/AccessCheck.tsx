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
          console.log('User is BWS user, granting access');
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
          console.error('No active session found');
          onError("Please sign in to continue");
          onLoadingChange(false);
          return;
        }

        console.log('Session found:', {
          userId: sessionData.session.user.id,
          companyId: company.id
        });

        // Check company access with retry logic
        const checkCompanyAccess = async () => {
          try {
            console.log('Checking company access:', {
              userId: sessionData.session?.user.id,
              companyId: company.id,
              attempt: retryCount + 1
            });
            
            const { data: userCompany, error: companyError } = await supabase
              .from('user_companies')
              .select('company_id')
              .eq('user_id', sessionData.session.user.id)
              .eq('company_id', company.id)
              .maybeSingle();

            if (companyError) {
              console.error('Company access error:', companyError);
              throw companyError;
            }

            console.log('Access check result:', {
              hasAccess: !!userCompany,
              companyData: userCompany
            });

            onAccessChange(!!userCompany);
            onLoadingChange(false);
            setRetryCount(0); // Reset retry count on success
          } catch (error) {
            console.error('Error checking company access:', {
              error,
              attempt: retryCount + 1,
              maxRetries
            });
            
            if (retryCount < maxRetries) {
              // Exponential backoff with a maximum delay of 8 seconds
              const delay = Math.min(1000 * Math.pow(2, retryCount), 8000);
              setRetryCount(prev => prev + 1);
              
              console.log('Retrying access check:', {
                attempt: retryCount + 1,
                delay,
                maxRetries
              });
              
              toast.error(`Connection issue. Retrying... (${retryCount + 1}/${maxRetries})`);
              
              setTimeout(checkCompanyAccess, delay);
            } else {
              console.error('Max retries reached:', {
                attempts: retryCount,
                maxRetries
              });
              onError("Unable to verify access. Please check your internet connection and try again.");
              onLoadingChange(false);
              toast.error("Connection error. Please refresh the page or try again later.");
            }
          }
        };

        await checkCompanyAccess();

      } catch (err) {
        console.error('Fatal error in checkAccess:', err);
        onError("Unable to load company information. Please try again later.");
        onLoadingChange(false);
        toast.error("An error occurred while loading company information");
      }
    };

    checkAccess();
  }, [company.id, isBWSUser, onAccessChange, onError, onLoadingChange, retryCount]);

  return null;
};