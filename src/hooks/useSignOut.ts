import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export const useSignOut = () => {
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      // First check if we have a session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Session check error:", sessionError);
        toast({
          title: "Session Error",
          description: "Unable to verify your session. Redirecting to login.",
        });
        window.location.href = '/auth';
        return;
      }

      if (!session) {
        console.log("No active session found, redirecting to auth");
        window.location.href = '/auth';
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
      
      // Always redirect to auth page after sign out attempt
      window.location.href = '/auth';
      
    } catch (err) {
      console.error("Unexpected error during sign out:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred while signing out",
        variant: "destructive",
      });
      // Redirect to auth page even if there's an error
      window.location.href = '/auth';
    }
  };

  return handleSignOut;
};