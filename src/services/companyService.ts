import { supabase } from "@/lib/supabase";
import { CompanyFormData } from "@/schemas/companySchema";
import { Company } from "@/types/models";

export const companyService = {
  async createCompany(data: CompanyFormData): Promise<Company> {
    const companyData = {
      name: data.name,
      industry: data.industry,
      website: data.website,
      address: data.address,
      billingaddress: data.useSeparateBillingAddress ? data.billingaddress : data.address,
      notes: data.notes,
    };
    
    const { data: company, error } = await supabase
      .from("companies")
      .insert([companyData])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(error.message);
    }

    if (!company) {
      throw new Error("Failed to create company");
    }

    return company as Company;
  }
};