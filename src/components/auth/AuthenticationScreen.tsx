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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      
      if (event === 'SIGNED_IN' && session) {
        console.log("User signed in, redirecting to home");
        toast.success("Welcome back!");
        // Force navigation and reload to ensure proper state update
        window.location.href = '/';
      }
      if (event === 'SIGNED_OUT') {
        console.log("User signed out, staying on auth screen");
        navigate('/');
      }
      if (event === 'USER_UPDATED') {
        const { error } = await supabase.auth.getSession();
        if (error) {
          handleAuthError(error);
        }
      }
    });

    // Check if we already have a session
    const checkExistingSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Session check error:", error);
          handleAuthError(error);
          return;
        }
        if (session) {
          console.log("Existing session found, redirecting to home");
          window.location.href = '/';
        }
      } catch (err) {
        console.error("Unexpected error during session check:", err);
        toast.error("An unexpected error occurred while checking your session");
      }
    };

    checkExistingSession();

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuthError = (error: AuthError) => {
    console.error("Auth error:", error);
    let errorMessage = "An error occurred during authentication";
    
    if (error.message.includes("missing email")) {
      errorMessage = "Please enter your email address";
    } else if (error.message.includes("invalid credentials")) {
      errorMessage = "Invalid email or password";
    } else if (error.message.includes("validation failed")) {
      errorMessage = "Please check your email and password";
    }
    
    toast.error(errorMessage);
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