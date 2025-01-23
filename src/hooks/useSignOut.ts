import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useSignOut = () => {
  const handleSignOut = async () => {
    try {
      // First clear any stored session data
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.clear();
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Sign out error:", error);
        // Only show error toast for non-session_not_found errors
        if (!error.message.includes('session_not_found')) {
          toast.error("Failed to sign out properly");
        }
      }

      // Force a complete page reload and redirect
      window.location.replace('/auth');
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
      // Force navigation even if there's an error
      window.location.replace('/auth');
    }
  };

  return { handleSignOut };
};