import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  const getUserCompany = async (userId: string) => {
    // First get the user's company association
    const { data: userCompany, error: userCompanyError } = await supabase
      .from('user_companies')
      .select('company_id')
      .eq('user_id', userId)
      .single();

    if (userCompanyError || !userCompany?.company_id) {
      console.error("Error fetching user company:", userCompanyError);
      throw new Error("No company association found");
    }

    // Then get the company details
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('id, name')
      .eq('id', userCompany.company_id)
      .single();

    if (companyError || !company) {
      console.error("Error fetching company:", companyError);
      throw new Error("Failed to fetch company details");
    }

    return company;
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          console.log("No active session");
          return;
        }

        const company = await getUserCompany(session.user.id);
        
        if (company.name === 'BWS') {
          console.log("BWS user detected, redirecting to admin dashboard");
          navigate('/');
        } else {
          console.log("Customer user detected, redirecting to:", `/customers/${company.id}`);
          navigate(`/customers/${company.id}`);
        }
      } catch (error) {
        console.error("Session check error:", error);
        toast.error("Failed to process login");
        await supabase.auth.signOut();
        navigate('/auth');
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      
      if (event === 'SIGNED_IN' && session) {
        try {
          const company = await getUserCompany(session.user.id);
          
          if (company.name === 'BWS') {
            console.log("BWS user detected, redirecting to admin dashboard");
            navigate('/');
          } else {
            console.log("Customer user detected, redirecting to:", `/customers/${company.id}`);
            navigate(`/customers/${company.id}`);
          }
        } catch (error) {
          console.error("Error handling sign in:", error);
          toast.error("Failed to process login");
          await supabase.auth.signOut();
          navigate('/auth');
        }
      }
      
      if (event === 'SIGNED_OUT') {
        console.log("User signed out, redirecting to auth");
        navigate('/auth');
      }
    });

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
};