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

    if (error) throw error;
    return company as Company;
  },

  async getCompanies(): Promise<Company[]> {
    const { data, error } = await supabase
      .from("companies")
      .select("*");

    if (error) throw error;
    return data as Company[];
  }
};