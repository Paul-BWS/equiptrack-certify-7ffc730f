import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Routes } from "./Routes";
import { isRefreshTokenError, getAuthErrorMessage } from "@/utils/authErrors";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        meta: {
          onError: (error: any) => {
            console.error('Query error:', error);
            const errorMessage = getAuthErrorMessage(error);
            
            if (isRefreshTokenError(error) || error.code === 'PGRST301') {
              console.log('Session expired, redirecting to login');
              supabase.auth.signOut(); // Clear the invalid session
            }
            
            toast.error(errorMessage);
          },
        },
      },
    },
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session check error:', error);
          if (isRefreshTokenError(error)) {
            await supabase.auth.signOut();
          }
          toast.error(getAuthErrorMessage(error));
          setSession(null);
        } else {
          setSession(session);
        }
      } catch (error) {
        console.error('Session check failed:', error);
        toast.error('Failed to check authentication status');
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_OUT') {
        console.info('User signed out');
        setSession(null);
        queryClient.clear();
      } else if (event === 'SIGNED_IN' && session) {
        console.info('User signed in');
        setSession(session);
        queryClient.clear();
      } else if (event === 'TOKEN_REFRESHED' && session) {
        console.info('Token refreshed successfully');
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Routes session={session} />
    </QueryClientProvider>
  );
}