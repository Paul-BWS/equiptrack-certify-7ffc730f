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
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Session check error:", error);
        toast.error(getErrorMessage(error));
        return;
      }
      if (session) {
        console.log("Existing session found, redirecting to home");
        window.location.href = '/';
      }
    };

    checkSession();

    // Then set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      
      if (event === 'SIGNED_IN' && session) {
        console.log("User signed in, redirecting to home");
        toast.success("Welcome back!");
        window.location.href = '/';
      }
      
      if (event === 'SIGNED_OUT') {
        console.log("User signed out");
        navigate('/');
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
    <div className="min-h-screen bg-[#4c6fbf] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col-reverse md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <RobotImage />
        </div>
        
        <div className="w-full md:w-1/2">
          <LoginCard />
        </div>
      </div>
    </div>
  );
};