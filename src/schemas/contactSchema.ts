import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  mobile_phone: z.string().optional(),
  is_primary: z.boolean().default(false),
  role: z.enum(["viewer", "editor", "admin"]).default("viewer"),
});

export type ContactFormData = z.infer<typeof contactSchema>;