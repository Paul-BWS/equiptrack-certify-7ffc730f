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
      console.log("Step 1: Starting company creation process");
      toast({
        title: "Processing",
        description: "Starting company creation process...",
      });

      // Validate required fields
      if (!data.name || !data.industry || !data.address) {
        console.log("Step 2: Validation failed - missing required fields");
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        throw new Error("Required fields are missing");
      }

      console.log("Step 3: Attempting database connection");
      toast({
        title: "Processing",
        description: "Connecting to database...",
      });

      try {
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
          console.error("Step 4: Database error:", error);
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
          throw error;
        }

        console.log("Step 5: Company created successfully:", newCompany);
        toast({
          title: "Success",
          description: "Company created successfully!",
        });

        return newCompany;
      } catch (error) {
        console.error("Step 4: Error during company creation:", error);
        toast({
          title: "Error",
          description: "Failed to create company",
          variant: "destructive",
        });
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("Step 6: Handling successful creation");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      form.reset();
      setOpen(false);
      toast({
        title: "Success",
        description: "Company has been created and saved",
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
    console.log("Form submitted with data:", data);
    toast({
      title: "Processing",
      description: "Submitting company details...",
    });
    createCompany(data);
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