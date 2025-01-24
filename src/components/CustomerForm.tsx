import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanyFormFields } from "./CompanyFormFields";
import { companySchema, type CompanyFormData } from "@/schemas/companySchema";
import { supabase } from "@/lib/supabase";

export const CustomerForm = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      website: "",
      industry: "",
      address: "",
      useSeparateBillingAddress: false,
      billingaddress: "",
      notes: "",
      phone: "",
      mobilePhone: "",
    },
  });

  const onSubmit = async (data: CompanyFormData) => {
    try {
      console.log("Step 1: Starting form submission");
      setIsSubmitting(true);
      console.log("Form data to be submitted:", data);
      
      toast({
        title: "Processing",
        description: "Creating new company...",
      });
      console.log("Step 2: Initial toast shown");

      const { error, data: newCompany } = await supabase.from('companies').insert([{
        name: data.name,
        industry: data.industry,
        website: data.website || null,
        address: data.address,
        useseparatebillingaddress: data.useSeparateBillingAddress,
        billingaddress: data.useSeparateBillingAddress ? data.billingaddress : data.address,
        notes: data.notes || null,
        phone: data.phone || null,
        mobile_phone: data.mobilePhone || null,
      }]);

      console.log("Step 3: Supabase response received", { error, newCompany });

      if (error) {
        console.error("Error creating company:", error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        console.log("Step 4a: Error toast shown");
        return;
      }

      console.log("Step 4b: Company created successfully");
      toast({
        title: "Success",
        description: "Company created successfully!",
      });

      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Caught error in form submission:", error);
      toast({
        title: "Error",
        description: "Failed to create company. Please try again.",
        variant: "destructive",
      });
    } finally {
      console.log("Step 5: Form submission completed");
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          variant="default"
          onClick={() => {
            console.log("New Company button clicked");
            toast({
              title: "Form Opened",
              description: "Please fill in the company details",
            });
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          New Company
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#f9fafb] p-6 z-50">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold">Add New Company</DialogTitle>
          <DialogDescription className="text-[#B3B3B3]">
            Fill in the company details below. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CompanyFormFields form={form} />
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 mt-6" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Company"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};