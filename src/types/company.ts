export interface Company {
  id: string;
  name: string;
  industry: string;
  website: string;
  address: string;
  useSeparateBillingAddress: boolean;
  billing_address: string;
  notes: string;
  created_at: string;
}