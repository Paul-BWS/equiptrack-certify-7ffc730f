import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export const useSignOut = () => {
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      // First check if we have a session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log("No active session found, redirecting to home");
        window.location.href = '/';
        return;
      }

      // Proceed with sign out if we have a session
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Sign out error:", error);
        // If it's a session not found error, handle it gracefully
        if (error.message.includes('session_not_found')) {
          toast({
            title: "Session expired",
            description: "Your session has expired. Redirecting to login.",
          });
        } else {
          toast({
            title: "Error signing out",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Signed out successfully",
          description: "You have been signed out of your account",
        });
      }
      
      // Always redirect to home page after sign out attempt
      window.location.href = '/';
      
    } catch (err) {
      console.error("Unexpected error during sign out:", err);
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