import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Company } from "@/types/company";
import { toast } from "sonner";

export const useProfileData = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState("");
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
          setIsLoading(false);
          return;
        }

        if (!session?.user) {
          console.log("No active session found");
          toast.error("Please sign in to access settings");
          setIsLoading(false);
          return;
        }

        setEmail(session.user.email || "");
        setName(session.user.user_metadata?.name || "");

        // Fetch companies based on user's access
        const { data: userCompanies, error: companiesError } = await supabase
          .from("companies")
          .select("*")
          .order("name");

        if (companiesError) {
          console.error("Error fetching companies:", companiesError);
          toast.error("Error fetching companies");
          setIsLoading(false);
          return;
        }

        if (userCompanies) {
          console.log("Fetched companies:", userCompanies);
          setCompanies(userCompanies);
        }

        // Fetch user's current company association
        const { data: userCompanyData, error: userCompanyError } = await supabase
          .from("user_companies")
          .select("company_id")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (userCompanyError) {
          console.error("Error fetching user company:", userCompanyError);
          toast.error("Error fetching user company");
          setIsLoading(false);
          return;
        }

        if (userCompanyData?.company_id) {
          setSelectedCompany(userCompanyData.company_id);
        }

        // Check if user is BWS user
        const { data: bwsStatus } = await supabase.rpc('is_bws_user');
        setIsBWSUser(bwsStatus || false);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const updateProfile = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        toast.error("Authentication error");
        return;
      }
      if (!session?.user) {
        toast.error("No active session found");
        return;
      }

      if (!selectedCompany) {
        toast.error("Please select a company");
        return;
      }

      // Update user metadata with name
      const { error: updateError } = await supabase.auth.updateUser({
        data: { name }
      });

      if (updateError) {
        console.error("Error updating user:", updateError);
        toast.error("Failed to update profile");
        return;
      }

      // Delete existing company association
      const { error: deleteError } = await supabase
        .from("user_companies")
        .delete()
        .eq("user_id", session.user.id);

      if (deleteError) {
        console.error("Error deleting company association:", deleteError);
        toast.error("Failed to update company association");
        return;
      }

      // Insert new company association
      const { error: insertError } = await supabase
        .from("user_companies")
        .insert([
          {
            user_id: session.user.id,
            company_id: selectedCompany,
          },
        ]);

      if (insertError) {
        console.error("Error inserting company association:", insertError);
        toast.error("Failed to update company association");
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
    companies,
    selectedCompany,
    setSelectedCompany,
    isBWSUser,
    isLoading,
    updateProfile,
  };
};