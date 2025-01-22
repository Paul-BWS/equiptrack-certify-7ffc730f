import { Contact } from "./contact";

export interface Company {
  id: string;
  name: string;
  industry: string;
  website: string;
  address1: string;
  address2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  useSeparateBillingAddress: boolean;
  billingaddress: string;
  notes: string;
  created_at: string;
  contacts?: Contact[];
}