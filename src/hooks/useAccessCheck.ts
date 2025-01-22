import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { verifySupabaseConnection, verifyUserSession, checkCompanyAccess } from '@/utils/authUtils';
import { Company } from '@/types/company';

interface UseAccessCheckProps {
  company: Company;
  isBWSUser: boolean;
  onAccessChange: (hasAccess: boolean) => void;
  onError: (error: string) => void;
  onLoadingChange: (isLoading: boolean) => void;
}

export const useAccessCheck = ({
  company,
  isBWSUser,
  onAccessChange,
  onError,
  onLoadingChange
}: UseAccessCheckProps) => {
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    const performAccessCheck = async () => {
      try {
        // Verify Supabase Connection
        await verifySupabaseConnection();

        // Log BWS User Status
        console.log('👤 BWS User Status:', isBWSUser);
        if (isBWSUser) {
          console.log('✅ User is BWS user, granting access');
          onAccessChange(true);
          onLoadingChange(false);
          return;
        }

        // Check Session
        const session = await verifyUserSession();

        // Check Company Access
        const hasAccess = await checkCompanyAccess(session.user.id, company.id);
        onAccessChange(hasAccess);
        onLoadingChange(false);
        setRetryCount(0);

        if (!hasAccess) {
          toast.error("You don't have access to this company");
        }

      } catch (error) {
        console.error('❌ Error in access check:', error);
        
        if (retryCount < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, retryCount), 8000);
          setRetryCount(prev => prev + 1);
          
          console.log('🔄 Retrying access check:', {
            attempt: retryCount + 1,
            delay,
            maxRetries
          });
          
          setTimeout(performAccessCheck, delay);
        } else {
          onError("Unable to verify company access. Please try again later.");
          onLoadingChange(false);
          toast.error("Error verifying company access");
        }
      }
    };

    performAccessCheck();
  }, [company.id, isBWSUser, onAccessChange, onError, onLoadingChange, retryCount]);
};