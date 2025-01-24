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
    if (isSubmitting) return;
    
    try {
      console.log("Step 1: Starting form submission");
      setIsSubmitting(true);
      console.log("Form data to be submitted:", data);
      
      // Show initial processing toast
      toast({
        title: "Processing",
        description: "Creating new company...",
        duration: 3000,
      });
      
      // Reset form before submission to prevent data persistence
      form.reset();
      
      // Attempt to insert the company
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
      }]).select();

      console.log("Step 3: Supabase response received", { error, newCompany });

      if (error) {
        console.error("Error creating company:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to create company",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      console.log("Step 4: Company created successfully");
      
      toast({
        title: "Success",
        description: "Company created successfully!",
        duration: 3000,
      });

      // Close the modal after successful submission
      setOpen(false);
      
    } catch (error) {
      console.error("Caught error in form submission:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create company",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          // Reset form when dialog is closed
          form.reset();
        }
        setOpen(newOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button 
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          variant="default"
          onClick={() => {
            console.log("New Company button clicked");
            toast({
              title: "Form Opened",
              description: "Please fill in the company details",
              duration: 3000,
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