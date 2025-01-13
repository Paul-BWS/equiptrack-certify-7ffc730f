import { User } from "@supabase/supabase-js";

export interface UserCompany {
  user_id: string;
  user_email: string;
  company_id: string;
  company_name: string;
}

export interface Company {
  id: string;
  name: string;
}

export interface AdminUser extends User {
  id: string;
}