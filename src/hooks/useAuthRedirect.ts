import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { fetchUserCompany, fetchCompanyDetails, getErrorMessage } from "@/utils/authUtils";

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  const handleRedirect = async (companyId: string, companyName: string) => {
    try {
      if (!companyId) {
        throw new Error("No company ID available for redirection");
      }

      if (companyName === 'BWS') {
        console.log("BWS user detected, redirecting to main dashboard");
        navigate('/');
      } else {
        console.log("Customer user detected, redirecting to customer dashboard");
        navigate(`/customers/${companyId}`);
      }
    } catch (error) {
      console.error("Error in redirect:", error);
      toast.error("Failed to redirect to dashboard");
      await supabase.auth.signOut();
      navigate('/auth');
    }
  };

  const redirectUserBasedOnProfile = async (userId: string) => {
    try {
      console.log("Fetching user company association for user:", userId);
      const companyId = await fetchUserCompany(userId);
      
      if (!companyId) {
        throw new Error("No company association found");
      }
      
      const companyData = await fetchCompanyDetails(companyId);
      await handleRedirect(companyId, companyData.name);
    } catch (error) {
      console.error("Error in redirect:", error);
      toast.error(error instanceof Error ? error.message : "Failed to process login. Please try again.");
      await supabase.auth.signOut();
      navigate('/auth');
    }
  };

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        console.log("Checking for existing session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (error) {
          console.error("Session check error:", error);
          toast.error(getErrorMessage(error));
          return;
        }

        if (session?.user) {
          console.log("Existing session found, redirecting...");
          await redirectUserBasedOnProfile(session.user.id);
        }
      } catch (error) {
        console.error("Unexpected error during session check:", error);
        if (mounted) {
          toast.error("An unexpected error occurred while checking your session");
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      console.log("Auth state changed:", event, session);
      
      if (event === 'SIGNED_IN' && session) {
        console.log("User signed in, checking profile...");
        await redirectUserBasedOnProfile(session.user.id);
      }
      
      if (event === 'SIGNED_OUT') {
        console.log("User signed out");
        navigate('/auth');
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  return { redirectUserBasedOnProfile };
};