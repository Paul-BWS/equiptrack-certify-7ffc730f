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
    <div className="min-h-screen bg-[#4c6fbf] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col-reverse md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img 
            src="/robot.png" 
            alt="Robot mascot" 
            className="w-48 md:w-96 h-auto animate-fade-in"
          />
        </div>
        
        <div className="w-full md:w-1/2">
          <Card className="p-8 w-full max-w-md mx-auto bg-white/95 backdrop-blur">
            <h1 className="text-3xl font-bold text-center mb-2 text-[#4c6fbf]">EquipTrack</h1>
            <p className="text-center mb-6 text-gray-600">
              Don't have an account yet?{' '}
              <a href="#" className="text-[#4c6fbf] hover:underline">Sign Up</a>
            </p>
            
            <Auth
              supabaseClient={supabase}
              appearance={{ 
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#4c6fbf',
                      brandAccent: '#3d5ba6',
                      inputBackground: 'white',
                      inputText: '#1f2937',
                      inputBorder: '#e5e7eb',
                      inputBorderHover: '#4c6fbf',
                      inputBorderFocus: '#4c6fbf',
                    },
                    space: {
                      inputPadding: '0.75rem',
                      buttonPadding: '0.75rem',
                    },
                    borderWidths: {
                      buttonBorderWidth: '1px',
                      inputBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: '0.5rem',
                      buttonBorderRadius: '0.5rem',
                      inputBorderRadius: '0.5rem',
                    },
                  },
                },
                className: {
                  container: 'w-full',
                  button: 'w-full bg-[#4c6fbf] hover:bg-[#3d5ba6] text-white font-medium py-2 px-4 rounded-lg transition-colors',
                  input: 'w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4c6fbf] focus:border-transparent',
                  label: 'block text-sm font-medium text-gray-700 mb-1',
                },
              }}
              providers={[]}
              redirectTo={window.location.origin}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};