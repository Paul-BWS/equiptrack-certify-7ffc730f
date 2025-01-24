import { supabase } from "@/lib/supabase";
import { CompanyFormData } from "@/schemas/companySchema";
import { Company } from "@/types/company";

export const companyService = {
  async createCompany(data: CompanyFormData): Promise<Company> {
    console.log("CompanyService: Creating company with data:", data);
    
    const { data: company, error } = await supabase
      .from("companies")
      .insert([{
        name: data.name,
        industry: data.industry,
        website: data.website || null,
        address: data.address,
        useseparatebillingaddress: data.useSeparateBillingAddress,
        billingaddress: data.useSeparateBillingAddress ? data.billingaddress : data.address,
        notes: data.notes || null,
        phone: data.phone || null,
        mobile_phone: data.mobilePhone || null,
      }])
      .select()
      .single();

    if (error) {
      console.error("CompanyService: Error creating company:", error);
      throw new Error(error.message);
    }

    if (!company) {
      console.error("CompanyService: No company returned after creation");
      throw new Error("Failed to create company");
    }

    console.log("CompanyService: Successfully created company:", company);
    return company as Company;
  }
};