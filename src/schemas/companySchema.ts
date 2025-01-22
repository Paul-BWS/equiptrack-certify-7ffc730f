import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  website: z.string()
    .transform((val) => {
      if (!val) return "";
      if (!/^https?:\/\//i.test(val)) {
        return `https://${val}`;
      }
      return val;
    })
    .refine(
      (val) => {
        if (!val) return true; // Allow empty strings
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Invalid website URL" }
    ),
  address1: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postcode: z.string().optional(),
  country: z.string().optional(),
  useSeparateBillingAddress: z.boolean().default(false),
  billingaddress: z.string().min(1, "Billing address is required").optional(),
  notes: z.string(),
});

export type CompanyFormData = z.infer<typeof companySchema>;