export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
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
  address1: string;
  address2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  useSeparateBillingAddress: boolean;
  billingAddress?: string;
  company: string;
  website: string;
  notes: string;
  industry: string;
}