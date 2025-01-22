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
  useEffect(() => {
    const checkAccess = async () => {
      try {
        if (isBWSUser) {
          onAccessChange(true);
          onLoadingChange(false);
          return;
        }

        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          onError("Please sign in again to continue");
          toast.error("Your session has expired. Please sign in again.");
          return;
        }

        if (!sessionData?.session) {
          onError("Please sign in to continue");
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

            onAccessChange(!!userCompany);
            success = true;
          } catch (fetchError) {
            retryCount++;
            if (retryCount === maxRetries) {
              console.error('Error checking company access:', fetchError);
              onError("Unable to verify access. Please try again later.");
              toast.error("Connection error. Please check your internet connection.");
            } else {
              await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
            }
          }
        }
      } catch (err) {
        console.error('Error in checkAccess:', err);
        onError("Unable to load company information");
        toast.error("An error occurred while loading company information");
      } finally {
        onLoadingChange(false);
      }
    };

    checkAccess();
  }, [company.id, isBWSUser, onAccessChange, onError, onLoadingChange]);

  return null;
};