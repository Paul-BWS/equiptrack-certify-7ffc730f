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
        if (!error.message.includes('session_not_found')) {
          toast.error("Failed to sign out properly");
        }
      }

      navigate('/auth');
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
      navigate('/auth');
    }
  };

  return { handleSignOut };
};