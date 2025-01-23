import { supabase } from "@/lib/supabase";
import { AuthError } from "@supabase/supabase-js";

export const fetchUserCompany = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_companies')
    .select('company_id')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error("Error fetching user company:", error);
    throw new Error("Error loading user profile");
  }

  if (!data?.company_id) {
    console.log("No company associated with user");
    throw new Error("No company associated with your account. Please contact support.");
  }

  console.log("Found company ID:", data.company_id);
  return data.company_id;
};

export const fetchCompanyDetails = async (companyId: string) => {
  const { data, error } = await supabase
    .from('companies')
    .select('name')
    .eq('id', companyId)
    .single();

  if (error) {
    console.error("Error fetching company:", error);
    throw new Error("Error loading company information");
  }

  console.log("Company data:", data);
  return data;
};

export const getErrorMessage = (error: AuthError) => {
  if (error.message.includes("refresh_token_not_found")) {
    return "Your session has expired. Please sign in again.";
  }
  if (error.message.includes("invalid credentials")) {
    return "Invalid email or password";
  }
  return error.message;
};