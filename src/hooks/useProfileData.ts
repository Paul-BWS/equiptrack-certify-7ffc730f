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

        // Get user's company
        const { data: userCompanyData, error: userCompanyError } = await supabase
          .from('user_companies')
          .select('company_id')
          .eq('user_id', session.user.id)
          .single();

        if (userCompanyError) {
          console.error("Error fetching user company:", userCompanyError);
          return;
        }

        if (userCompanyData?.company_id) {
          // Get company details
          const { data: companyData, error: companyError } = await supabase
            .from('companies')
            .select('name')
            .eq('id', userCompanyData.company_id)
            .single();

          if (!companyError && companyData) {
            setCompanyName(companyData.name);
            setIsBWSUser(companyData.name === 'BWS');
          }
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