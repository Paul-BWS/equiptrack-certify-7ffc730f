import { useToast } from "./use-toast";
import { supabase } from "@/lib/supabase";

export const useSignOut = () => {
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        // Check if it's a session not found error
        if (error.message.includes('session_not_found')) {
          console.log('Session already expired, redirecting to login');
          toast({
            title: "Session expired",
            description: "Your session has expired. Please sign in again.",
          });
          window.location.href = '/';
          return;
        }
        
        toast({
          title: "Error signing out",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed out successfully",
          description: "You have been signed out of your account",
        });
        window.location.href = '/';
      }
    } catch (err) {
      console.error("Error during sign out:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred while signing out",
        variant: "destructive",
      });
      // Force redirect to login page even if there's an error
      window.location.href = '/';
    }
  };

  return handleSignOut;
};