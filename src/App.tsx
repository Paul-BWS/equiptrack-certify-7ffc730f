import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Routes } from "./Routes";
import { useEffect } from "react";
import { supabase } from "./lib/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
            } else if (error.code === 'PGRST301') {
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

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED' && !session) {
        console.info('User signed out or session expired, clearing cache and redirecting');
        queryClient.clear();
        navigate('/');
      } else if (event === 'SIGNED_IN') {
        console.info('User signed in');
        queryClient.clear(); // Clear cache to ensure fresh data load
      }
      console.info('Auth state changed:', event);
    });

    // Check initial session
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        console.info('No active session, redirecting to root');
        navigate('/');
      }
    };
    
    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

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