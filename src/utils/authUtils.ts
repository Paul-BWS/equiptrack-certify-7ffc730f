import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const checkBWSUser = async () => {
  const { data: isBWSUser } = await supabase.rpc('is_bws_user');
  if (isBWSUser) {
    console.log("BWS user detected");
    return true;
  }
  return false;
};

export const getProfileCompany = async (userId: string) => {
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('company_id')
    .eq('id', userId)
    .maybeSingle();

  if (profileError) {
    console.error("Error fetching user profile:", profileError);
    throw new Error("Failed to fetch user profile");
  }

  return profile?.company_id;
};

export const getCompanyDetails = async (companyId: string) => {
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select('id, name')
    .eq('id', companyId)
    .single();

  if (companyError || !company) {
    console.error("Error fetching company:", companyError);
    throw new Error("Failed to fetch company details");
  }

  return company;
};

export const getUserCompanyFromUserCompanies = async (userId: string) => {
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

  return userCompany.company_id;
};

export const updateProfileCompany = async (userId: string, companyId: string) => {
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ company_id: companyId })
    .eq('id', userId);

  if (updateError) {
    console.error("Error updating profile:", updateError);
  }
};

export const handleAuthError = async () => {
  console.error("Session check error");
  toast.error("Failed to process login");
  await supabase.auth.signOut();
  window.location.href = '/auth';
};