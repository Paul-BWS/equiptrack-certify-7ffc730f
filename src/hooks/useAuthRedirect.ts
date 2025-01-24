import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { 
  checkBWSUser, 
  getProfileCompany, 
  getCompanyDetails,
  getUserCompanyFromUserCompanies,
  updateProfileCompany,
  handleAuthError
} from "@/utils/authUtils";

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  const getUserCompany = async (userId: string) => {
    console.log("Fetching company for user:", userId);
    
    // Check if user is BWS user first
    const isBWSUser = await checkBWSUser();
    if (isBWSUser) {
      return { id: null, name: 'BWS' };
    }

    // Get company from profile
    const profileCompanyId = await getProfileCompany(userId);
    
    if (profileCompanyId) {
      console.log("Found company ID in profile:", profileCompanyId);
      return getCompanyDetails(profileCompanyId);
    }

    // If no company in profile, check user_companies table
    const companyId = await getUserCompanyFromUserCompanies(userId);
    console.log("Found company ID in user_companies:", companyId);
    
    const company = await getCompanyDetails(companyId);

    // Update profile with company_id if not set
    await updateProfileCompany(userId, company.id);

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
        await handleAuthError();
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

        // Check if user is BWS user first
        const isBWSUser = await checkBWSUser();
        if (isBWSUser) {
          console.log("BWS user detected during session check");
          return; // Allow BWS users to stay on current page
        }

        console.log("Checking session for user:", session.user.email);
        await handleRedirect(session);
      } catch (error) {
        await handleAuthError();
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