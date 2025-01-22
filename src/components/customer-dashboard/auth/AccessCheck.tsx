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
        // Verify Supabase Connection
        console.log('🔍 Verifying Supabase connection...');
        const { data: connectionTest, error: connectionError } = await supabase
          .from('companies')
          .select('id')
          .limit(1);

        if (connectionError) {
          console.error('❌ Supabase connection test failed:', connectionError);
          throw new Error('Database connection failed');
        }
        console.log('✅ Supabase connection successful');

        // Log BWS User Status
        console.log('👤 BWS User Status:', isBWSUser);
        if (isBWSUser) {
          console.log('✅ User is BWS user, granting access');
          onAccessChange(true);
          onLoadingChange(false);
          return;
        }

        // Check Session
        console.log('🔑 Checking user session...');
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('❌ Session error:', sessionError);
          onError("Your session has expired. Please sign in again.");
          toast.error("Session expired. Please sign in again.");
          onLoadingChange(false);
          return;
        }

        if (!sessionData?.session) {
          console.error('❌ No active session found');
          onError("Please sign in to continue");
          onLoadingChange(false);
          return;
        }

        console.log('✅ Session found:', {
          userId: sessionData.session.user.id,
          companyId: company.id
        });

        // Check Company Access
        const checkCompanyAccess = async () => {
          try {
            console.log('🔍 Checking company access:', {
              userId: sessionData.session?.user.id,
              companyId: company.id,
              attempt: retryCount + 1
            });
            
            const response = await supabase
              .from('user_companies')
              .select('company_id')
              .eq('user_id', sessionData.session.user.id)
              .eq('company_id', company.id)
              .maybeSingle();

            // Log the raw response for debugging
            console.log('📝 Raw response:', response);

            if (response.status === 500) {
              console.error('❌ Server error (500):', response);
              throw new Error('Server error: The service is temporarily unavailable');
            }

            if (response.error) {
              console.error('❌ Company access error:', response.error);
              throw response.error;
            }

            console.log('✅ Access check result:', {
              hasAccess: !!response.data,
              companyData: response.data
            });

            onAccessChange(!!response.data);
            onLoadingChange(false);
            setRetryCount(0);
          } catch (error) {
            console.error('❌ Error checking company access:', {
              error,
              attempt: retryCount + 1,
              maxRetries
            });
            
            if (retryCount < maxRetries) {
              const delay = Math.min(1000 * Math.pow(2, retryCount), 8000);
              setRetryCount(prev => prev + 1);
              
              console.log('🔄 Retrying access check:', {
                attempt: retryCount + 1,
                delay,
                maxRetries
              });
              
              toast.error(`Server error. Retrying... (${retryCount + 1}/${maxRetries})`);
              
              setTimeout(checkCompanyAccess, delay);
            } else {
              console.error('❌ Max retries reached:', {
                attempts: retryCount,
                maxRetries
              });
              onError("The service is temporarily unavailable. Please try again later.");
              onLoadingChange(false);
              toast.error("Server error. Please try again later.");
            }
          }
        };

        await checkCompanyAccess();

      } catch (err) {
        console.error('❌ Fatal error in checkAccess:', err);
        onError("Unable to load company information. Please try again later.");
        onLoadingChange(false);
        toast.error("An error occurred while loading company information");
      }
    };

    checkAccess();
  }, [company.id, isBWSUser, onAccessChange, onError, onLoadingChange, retryCount]);

  return null;
};