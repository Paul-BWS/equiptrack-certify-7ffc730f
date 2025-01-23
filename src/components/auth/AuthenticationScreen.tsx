import { supabase } from "@/lib/supabase";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { AuthError } from '@supabase/supabase-js';
import { LoginCard } from "./login/LoginCard";
import { RobotImage } from "./login/RobotImage";

export const AuthenticationScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session first
    const checkSession = async () => {
      try {
        console.log("Checking for existing session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Session check error:", error);
          toast.error(getErrorMessage(error));
          return;
        }
        if (session) {
          console.log("Existing session found, redirecting...");
          await redirectUserBasedOnProfile(session.user.id);
        }
      } catch (error) {
        console.error("Unexpected error during session check:", error);
        toast.error("An unexpected error occurred while checking your session");
      }
    };

    checkSession();

    // Then set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (event === 'SIGNED_IN' && session) {
        console.log("User signed in, checking profile...");
        toast.success("Welcome back!");
        try {
          await redirectUserBasedOnProfile(session.user.id);
        } catch (error) {
          console.error("Error during redirect:", error);
          toast.error("Failed to process login. Please try again.");
        }
      }
      
      if (event === 'SIGNED_OUT') {
        console.log("User signed out");
        navigate('/auth');
      }
      
      if (event === 'TOKEN_REFRESHED') {
        console.log("Token refreshed successfully");
      }
      
      if (event === 'USER_UPDATED') {
        try {
          const { error } = await supabase.auth.getSession();
          if (error) throw error;
        } catch (error) {
          if (error instanceof AuthError) {
            console.error("Auth error:", error);
            toast.error(getErrorMessage(error));
          }
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const redirectUserBasedOnProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      // First get the user's profile to get their company_id
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
        return;
      }

      console.log("Found company ID:", profileData.company_id);
      // Then get the company details
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
      // If the user is from BWS, redirect to the main dashboard
      if (companyData.name === 'BWS') {
        console.log("BWS user detected, redirecting to main dashboard");
        navigate('/');
      } else {
        // For all other companies, redirect to their customer dashboard
        console.log("Customer user detected, redirecting to customer dashboard");
        navigate(`/customers/${profileData.company_id}`);
      }
    } catch (error) {
      console.error("Error in redirect:", error);
      toast.error("Failed to process login. Please try again.");
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

  return (
    <div className="min-h-screen bg-[#4c6fbf] flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#4c6fbf] py-8 px-4 flex justify-center items-center">
        <RobotImage />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-start md:items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8">
          {/* Hide robot image on mobile since it's in the header */}
          <div className="hidden md:flex w-full md:w-1/2 justify-center">
            <RobotImage />
          </div>
          
          <div className="w-full md:w-1/2">
            <LoginCard />
          </div>
        </div>
      </div>
    </div>
  );
};