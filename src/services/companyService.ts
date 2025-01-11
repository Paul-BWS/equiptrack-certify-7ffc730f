import { supabase } from "@/lib/supabase";
import { CompanyFormData } from "@/schemas/companySchema";
import { Company } from "@/types/models";

export const companyService = {
  async createCompany(data: CompanyFormData): Promise<Company> {
    const companyData = {
      ...data,
      billingAddress: data.useSeparateBillingAddress ? data.billingAddress : data.address,
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
  },

  async getCompanies(): Promise<Company[]> {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(error.message);
    }

    return data as Company[];
  }
};