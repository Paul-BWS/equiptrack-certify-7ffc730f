import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  mobile_phone: z.string().optional(),
  role: z.enum(['viewer', 'editor', 'admin']).default('viewer'),
  is_primary: z.boolean().default(false),
});

export type ContactFormData = z.infer<typeof contactSchema>;