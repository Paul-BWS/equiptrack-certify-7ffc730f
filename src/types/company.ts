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