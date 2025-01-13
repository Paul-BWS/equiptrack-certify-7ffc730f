import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  website: z.string().url("Invalid website URL").or(z.string().length(0)),
  address: z.string().min(1, "Site address is required"),
  useSeparateBillingAddress: z.boolean().default(false),
  billingaddress: z.string().min(1, "Billing address is required").optional(),
  notes: z.string(),
});

export type CompanyFormData = z.infer<typeof companySchema>;