import { supabase } from "@/lib/supabase";
import { CompanyFormData } from "@/schemas/companySchema";
import { Company } from "@/types/company";

export const companyService = {
  async createCompany(data: CompanyFormData): Promise<Company> {
    console.log("Creating company with data:", data);
    
    const companyData = {
      name: data.name,
      industry: data.industry,
      website: data.website || null,
      address: data.address,
      phone: data.phone || null,
      mobile_phone: data.mobilePhone || null,
      notes: data.notes || null,
      useseparatebillingaddress: data.useSeparateBillingAddress,
      billingaddress: data.useSeparateBillingAddress ? data.billingaddress : data.address,
    };

    console.log("Formatted company data for Supabase:", companyData);

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

    console.log("Successfully created company:", company);
    return company as Company;
  }
};