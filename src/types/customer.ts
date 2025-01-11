export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  billingAddress: string;
  useSeparateBillingAddress: boolean;
  company: string;
  website: string;
  notes: string;
  industry: string;
}

export type CustomerFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  useSeparateBillingAddress: boolean;
  billingAddress?: string;
  company: string;
  website: string;
  notes: string;
  industry: string;
}