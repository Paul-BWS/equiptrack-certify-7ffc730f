import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Routes } from "./Routes";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LoadingScreen } from "./components/auth/LoadingScreen";
import { AuthenticationScreen } from "./components/auth/AuthenticationScreen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      meta: {
        onSettled: (data: any, error: any) => {
          if (error) {
            console.error('Query error:', error);
            if (error.message === 'Failed to fetch') {
              toast.error('Connection error. Please check your internet connection and try refreshing the page.');
            } else if (error.code === 'PGRST301' || error.message.includes('refresh_token_not_found')) {
              console.log('Session expired, redirecting to login');
              supabase.auth.signOut(); // Clear the invalid session
              toast.error('Session expired. Please sign in again.');
            } else {
              toast.error('An error occurred. Please try again.');
            }
          }
        }
      }
    },
  },
});

function AppContent() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Initial session check
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session check error:', error);
          if (error.message.includes('refresh_token_not_found')) {
            await supabase.auth.signOut(); // Clear the invalid session
            toast.error('Session expired. Please sign in again.');
          } else {
            toast.error('Authentication error. Please try signing in again.');
          }
          setSession(null);
        } else {
          setSession(session);
        }
      } catch (err) {
        console.error('Unexpected error during session check:', err);
        toast.error('An unexpected error occurred. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.info('Auth state changed:', event);
      
      if (event === 'SIGNED_OUT' || (event === 'TOKEN_REFRESHED' && !session)) {
        console.info('User signed out or session expired, clearing cache and redirecting');
        queryClient.clear();
        setSession(null);
        navigate('/');
      } else if (event === 'SIGNED_IN') {
        console.info('User signed in');
        setSession(session);
        queryClient.clear(); // Clear cache to ensure fresh data load
      } else if (event === 'TOKEN_REFRESHED' && session) {
        console.info('Token refreshed successfully');
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!session) {
    return <AuthenticationScreen />;
  }

  return (
    <>
      <Routes />
      <Toaster />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;