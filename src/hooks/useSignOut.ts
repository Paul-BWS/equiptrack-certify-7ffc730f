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
        // Don't show error to user if it's just a session not found error
        if (!error.message.includes('session_not_found')) {
          toast.error("Failed to sign out properly");
        }
      }

      // Always redirect to auth page after sign out attempt
      navigate('/auth');
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
      // Still redirect to auth page even if there's an error
      navigate('/auth');
    }
  };

  return { handleSignOut };
};