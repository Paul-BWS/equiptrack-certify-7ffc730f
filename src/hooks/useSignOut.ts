import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export const useSignOut = () => {
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Sign out error:", error);
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