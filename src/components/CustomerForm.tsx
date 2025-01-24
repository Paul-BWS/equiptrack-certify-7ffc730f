import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanyFormFields } from "./CompanyFormFields";
import { companySchema, type CompanyFormData } from "@/schemas/companySchema";
import { supabase } from "@/lib/supabase";

export const CustomerForm = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  const { mutate: createCompany, isPending } = useMutation({
    mutationFn: async (data: CompanyFormData) => {
      toast({
        title: "Starting Process",
        description: "Initiating company creation...",
      });
      
      console.log("Step 1: Form submitted with data:", data);

      if (!data.name || !data.industry || !data.address) {
        const error = new Error("Required fields are missing");
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Connecting",
        description: "Connecting to database...",
      });

      console.log("Step 2: Attempting Supabase insert");
      
      const { data: newCompany, error } = await supabase
        .from('companies')
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
        console.error("Database error:", error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Success",
        description: "Company data saved successfully",
      });

      console.log("Step 3: Company created:", newCompany);
      return newCompany;
    },
    onSuccess: (data) => {
      console.log("Step 4: Success callback triggered");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      form.reset();
      setOpen(false);
      toast({
        title: "Complete",
        description: "New company has been created",
      });
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create company",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CompanyFormData) => {
    console.log("Form submission started", data);
    toast({
      title: "Processing",
      description: "Processing your request...",
    });
    
    try {
      createCompany(data);
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast({
        title: "Submission Error",
        description: "Failed to process form submission",
        variant: "destructive",
      });
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
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create Company"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};