export interface Contact {
  id: string;
  company_id: string;
  name: string;
  email: string;
  phone: string;
  mobile_phone?: string;
  is_primary: boolean;
  role: "viewer" | "editor" | "admin";
  created_at: string;
}