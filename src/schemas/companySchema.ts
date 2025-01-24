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
  address: z.string().min(1, "Site address is required"),
  useSeparateBillingAddress: z.boolean().default(false),
  billingaddress: z.string().min(1, "Billing address is required").optional(),
  notes: z.string(),
  phone: z.string().optional(),
  mobilePhone: z.string().optional(),
});

export type CompanyFormData = z.infer<typeof companySchema>;