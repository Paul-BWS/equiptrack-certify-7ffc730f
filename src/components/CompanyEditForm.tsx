import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Company } from "@/types/company";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { CompanyFormFields } from "./company-edit/CompanyFormFields";
import { companySchema, CompanyFormData } from "@/schemas/companySchema";

interface CompanyEditFormProps {
  company: Company;
}

export const CompanyEditForm = ({ company }: CompanyEditFormProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: company.name,
      industry: company.industry,
      website: company.website,
      address: company.address,
      useSeparateBillingAddress: company.billingaddress !== company.address,
      billingaddress: company.billingaddress || company.address,
      notes: company.notes,
    },
  });

  const { mutate: updateCompany, isPending } = useMutation({
    mutationFn: async (data: CompanyFormData) => {
      const companyData = {
        name: data.name,
        industry: data.industry,
        website: data.website,
        address: data.address,
        billingaddress: data.useSeparateBillingAddress ? data.billingaddress : data.address,
        notes: data.notes,
      };
      
      const { data: updatedCompany, error } = await supabase
        .from("companies")
        .update(companyData)
        .eq('id', company.id)
        .select()
        .single();

      if (error) throw error;
      return updatedCompany as Company;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company", company.id] });
      toast({
        title: "Success",
        description: "Company has been updated successfully",
      });
      setOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update company. Please try again.",
        variant: "destructive",
      });
      console.error("Error updating company:", error);
    },
  });

  const onSubmit = (data: CompanyFormData) => {
    updateCompany(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="bg-white hover:bg-white/90 border-[#0EA5E9] text-[#0EA5E9] hover:text-[#0EA5E9]"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Company</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CompanyFormFields form={form} />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Updating..." : "Update Company"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};