import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { AuthError } from '@supabase/supabase-js';

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  const fetchUserCompany = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_companies')
      .select('company_id')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error("Error fetching user company:", error);
      throw new Error("Error loading user profile");
    }

    if (!data?.company_id) {
      console.log("No company associated with user");
      throw new Error("No company associated with your account. Please contact support.");
    }

    console.log("Found company ID:", data.company_id);
    return data.company_id;
  };

  const fetchCompanyDetails = async (companyId: string) => {
    const { data, error } = await supabase
      .from('companies')
      .select('name')
      .eq('id', companyId)
      .single();

    if (error) {
      console.error("Error fetching company:", error);
      throw new Error("Error loading company information");
    }

    console.log("Company data:", data);
    return data;
  };

  const handleRedirect = async (companyId: string, companyName: string) => {
    if (companyName === 'BWS') {
      console.log("BWS user detected, redirecting to main dashboard");
      navigate('/');
    } else {
      console.log("Customer user detected, redirecting to customer dashboard");
      navigate(`/customers/${companyId}`);
    }
  };

  const redirectUserBasedOnProfile = async (userId: string) => {
    try {
      console.log("Fetching user company association for user:", userId);
      const companyId = await fetchUserCompany(userId);
      const companyData = await fetchCompanyDetails(companyId);
      await handleRedirect(companyId, companyData.name);
    } catch (error) {
      console.error("Error in redirect:", error);
      toast.error(error instanceof Error ? error.message : "Failed to process login. Please try again.");
      await supabase.auth.signOut();
      navigate('/auth');
    }
  };

  const getErrorMessage = (error: AuthError) => {
    if (error.message.includes("refresh_token_not_found")) {
      return "Your session has expired. Please sign in again.";
    }
    if (error.message.includes("invalid credentials")) {
      return "Invalid email or password";
    }
    return error.message;
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

  return { redirectUserBasedOnProfile, getErrorMessage };
};