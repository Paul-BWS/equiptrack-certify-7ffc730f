import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { AuthError } from '@supabase/supabase-js';

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
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-md mx-auto">
          <Card className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Welcome to EquipService</h1>
            <Auth
              supabaseClient={supabase}
              appearance={{ 
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#2563eb',
                      brandAccent: '#1d4ed8',
                    },
                  },
                },
              }}
              providers={[]}
              redirectTo={window.location.origin}
            />
          </Card>
        </div>
      </main>
    </div>
  );
};