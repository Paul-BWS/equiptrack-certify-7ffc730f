import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const verifySupabaseConnection = async () => {
  console.log('🔍 Verifying Supabase connection...');
  const { data, error } = await supabase
    .from('companies')
    .select('id')
    .limit(1);

  if (error) {
    console.error('❌ Supabase connection test failed:', error);
    throw new Error('Database connection failed');
  }
  console.log('✅ Supabase connection successful');
};

export const verifyUserSession = async () => {
  console.log('🔑 Checking user session...');
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError) {
    console.error('❌ Session error:', sessionError);
    throw new Error("Your session has expired. Please sign in again.");
  }

  if (!sessionData?.session) {
    console.error('❌ No active session found');
    throw new Error("Please sign in to continue");
  }

  console.log('✅ Session found:', {
    userId: sessionData.session.user.id
  });

  return sessionData.session;
};

export const checkCompanyAccess = async (userId: string, companyId: string) => {
  console.log('🔍 Checking company access:', { userId, companyId });
  
  const { data: userCompanies, error: accessError } = await supabase
    .from('user_companies')
    .select('company_id')
    .eq('user_id', userId)
    .eq('company_id', companyId);

  if (accessError) {
    console.error('❌ Company access error:', accessError);
    throw accessError;
  }

  const hasAccess = userCompanies && userCompanies.length > 0;
  console.log('✅ Access check result:', { hasAccess, userCompanies });
  
  return hasAccess;
};