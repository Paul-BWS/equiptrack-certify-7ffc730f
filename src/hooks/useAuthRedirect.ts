import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  const checkBWSUser = async () => {
    console.log("Checking if user is BWS user");
    const { data, error } = await supabase.rpc('is_bws_user');
    if (error) {
      console.error('Error checking BWS user status:', error);
      return false;
    }
    console.log("BWS user check result:", data);
    return data;
  };

  const getProfileCompany = async (userId: string) => {
    console.log("Getting profile company for user:", userId);
    const { data, error } = await supabase
      .from('profiles')
      .select('company_id')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error getting profile company:', error);
      return null;
    }

    console.log("Profile company data:", data);
    return data?.company_id;
  };

  const getCompanyDetails = async (companyId: string | null) => {
    if (!companyId) {
      console.log("No company ID provided");
      return null;
    }

    console.log("Getting company details for:", companyId);
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single();

    if (error) {
      console.error('Error getting company details:', error);
      return null;
    }

    console.log("Company details:", data);
    return data;
  };

  useEffect(() => {
    const handleAuthStateChange = async (event: string, session: any) => {
      console.log("Auth state changed:", event);
      
      if (event === 'SIGNED_IN' && session) {
        const isBWSUser = await checkBWSUser();
        console.log("Is BWS user:", isBWSUser);
        
        if (isBWSUser) {
          console.log("BWS user detected, staying on current page");
          return;
        }

        const profileCompany = await getProfileCompany(session.user.id);
        const company = await getCompanyDetails(profileCompany);
        
        if (company) {
          console.log("Redirecting to company dashboard:", company.id);
          navigate(`/customers/${company.id}`, { replace: true });
        } else {
          console.log("No company found, redirecting to home");
          navigate('/', { replace: true });
        }
      }
      
      if (event === 'SIGNED_OUT') {
        console.log("User signed out, redirecting to auth");
        navigate('/auth', { replace: true });
      }
    };

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        console.log("No active session");
        navigate('/auth', { replace: true });
        return;
      }

      const isBWSUser = await checkBWSUser();
      console.log("Session check - Is BWS user:", isBWSUser);
      
      if (isBWSUser) {
        console.log("BWS user detected, staying on current page");
        return;
      }

      const profileCompany = await getProfileCompany(session.user.id);
      const company = await getCompanyDetails(profileCompany);
      
      if (company) {
        console.log("Session check - Redirecting to company dashboard:", company.id);
        navigate(`/customers/${company.id}`, { replace: true });
      } else {
        console.log("No company found, staying on current page");
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);
    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
};