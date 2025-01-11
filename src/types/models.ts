export interface Company {
  id: string;
  name: string;
  industry: string;
  website: string;
  address: string;
  useSeparateBillingAddress: boolean;
  billingAddress: string;
  notes: string;
  created_at: string;
}

export interface Contact {
  id: string;
  company_id: string;
  name: string;
  email: string;
  phone: string;
  is_primary: boolean;
  created_at: string;
}