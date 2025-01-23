import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useSignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Sign out error:", error);
        // If the error is due to no session, we can ignore it and proceed with navigation
        if (!error.message.includes('session_not_found')) {
          toast.error("Failed to sign out properly");
        }
      }

      // Force navigation to auth page after signout
      window.location.href = '/auth';
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
      // Force navigation even if there's an error
      window.location.href = '/auth';
    }
  };

  return { handleSignOut };
};