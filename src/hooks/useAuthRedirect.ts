import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { AuthError } from '@supabase/supabase-js';

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  const redirectUserBasedOnProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        throw profileError;
      }

      if (!profileData?.company_id) {
        console.log("No company associated with user");
        toast.error("No company associated with your account");
        await supabase.auth.signOut();
        return;
      }

      console.log("Found company ID:", profileData.company_id);
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .select('name')
        .eq('id', profileData.company_id)
        .single();

      if (companyError) {
        console.error("Error fetching company:", companyError);
        throw companyError;
      }

      console.log("Company data:", companyData);
      if (companyData.name === 'BWS') {
        console.log("BWS user detected, redirecting to main dashboard");
        navigate('/');
      } else {
        console.log("Customer user detected, redirecting to customer dashboard");
        navigate(`/customers/${profileData.company_id}`);
      }
    } catch (error) {
      console.error("Error in redirect:", error);
      toast.error("Failed to process login. Please try again.");
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
    const checkSession = async () => {
      try {
        console.log("Checking for existing session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
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
        toast.error("An unexpected error occurred while checking your session");
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
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
      subscription.unsubscribe();
    };
  }, [navigate]);

  return { redirectUserBasedOnProfile, getErrorMessage };
};