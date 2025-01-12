import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useAuthCheck = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Auth check error:", sessionError);
          toast.error("Authentication error");
          navigate('/');
          return;
        }
        
        if (!session) {
          console.log("No active session found");
          toast.error("Please sign in to access settings");
          navigate('/');
          return;
        }

        // First get the user's profile to get their company_id
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('company_id')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
          toast.error("Error fetching user profile");
          return;
        }

        if (!profileData?.company_id) {
          console.log("No company associated with user");
          toast.error("No company associated with your account");
          return;
        }

        // Then get the company details
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .select('name')
          .eq('id', profileData.company_id)
          .single();

        if (companyError) {
          console.error("Company fetch error:", companyError);
          toast.error("Error fetching company details");
          return;
        }

        if (companyData?.name !== 'BWS') {
          toast.error("You don't have permission to access settings");
          navigate('/');
          return;
        }
        
        setIsAuthorized(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  return { isLoading, isAuthorized };
};