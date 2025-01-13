import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useProfileData = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState<string | undefined>();
  const [isBWSUser, setIsBWSUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          toast.error("Authentication error");
          return;
        }

        if (!session?.user) {
          console.log("No active session found");
          toast.error("Please sign in to access settings");
          return;
        }

        setEmail(session.user.email || "");
        setName(session.user.user_metadata?.name || "");

        // Get user's company name if they have one
        const { data: userData, error: userError } = await supabase
          .from('user_companies')
          .select('companies(name)')
          .eq('user_id', session.user.id)
          .single();

        if (!userError && userData?.companies) {
          setCompanyName(userData.companies.name);
          setIsBWSUser(userData.companies.name === 'BWS');
        }

      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const updateProfile = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.user) {
        toast.error("Authentication error");
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        data: { name }
      });

      if (updateError) {
        console.error("Error updating user:", updateError);
        toast.error("Failed to update profile");
        return;
      }

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return {
    email,
    name,
    setName,
    companyName,
    isBWSUser,
    isLoading,
    updateProfile,
  };
};