import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  const getUserCompany = async (userId: string) => {
    console.log("Fetching company for user:", userId);
    
    // First check if user has a profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('company_id')
      .eq('id', userId)
      .maybeSingle();

    if (profileError) {
      console.error("Error fetching user profile:", profileError);
      throw new Error("Failed to fetch user profile");
    }

    // If profile exists and has company_id, get company details
    if (profile?.company_id) {
      console.log("Found company ID in profile:", profile.company_id);
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .select('id, name')
        .eq('id', profile.company_id)
        .single();

      if (companyError || !company) {
        console.error("Error fetching company:", companyError);
        throw new Error("Failed to fetch company details");
      }

      console.log("Found company:", company);
      return company;
    }

    // If no company in profile, check user_companies table
    const { data: userCompany, error: userCompanyError } = await supabase
      .from('user_companies')
      .select('company_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (userCompanyError) {
      console.error("Error fetching user company:", userCompanyError);
      throw new Error("No company association found");
    }

    if (!userCompany?.company_id) {
      console.error("No company_id found for user");
      throw new Error("No company association found");
    }

    console.log("Found company ID in user_companies:", userCompany.company_id);

    // Get the company details
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('id, name')
      .eq('id', userCompany.company_id)
      .single();

    if (companyError || !company) {
      console.error("Error fetching company:", companyError);
      throw new Error("Failed to fetch company details");
    }

    // Update profile with company_id if not set
    if (!profile?.company_id) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ company_id: company.id })
        .eq('id', userId);

      if (updateError) {
        console.error("Error updating profile:", updateError);
        // Don't throw here, just log the error as it's not critical
      }
    }

    console.log("Found company:", company);
    return company;
  };

  useEffect(() => {
    const handleRedirect = async (session: any) => {
      try {
        const company = await getUserCompany(session.user.id);
        
        if (company.name === 'BWS') {
          console.log("BWS user detected, redirecting to admin dashboard");
          navigate('/', { replace: true });
        } else {
          console.log("Customer user detected, redirecting to:", `/customers/${company.id}`);
          window.location.href = `/customers/${company.id}`;
        }
      } catch (error) {
        console.error("Error handling redirect:", error);
        toast.error("Failed to process login");
        await supabase.auth.signOut();
        window.location.href = '/auth';
      }
    };

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          console.log("No active session");
          navigate('/auth', { replace: true });
          return;
        }

        console.log("Checking session for user:", session.user.email);
        await handleRedirect(session);
      } catch (error) {
        console.error("Session check error:", error);
        toast.error("Failed to process login");
        await supabase.auth.signOut();
        window.location.href = '/auth';
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      
      if (event === 'SIGNED_IN' && session) {
        await handleRedirect(session);
      }
      
      if (event === 'SIGNED_OUT') {
        console.log("User signed out, redirecting to auth");
        window.location.href = '/auth';
      }
    });

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
};