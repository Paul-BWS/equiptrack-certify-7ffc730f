import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { CompanyFormData } from "@/schemas/companySchema";
import { useToast } from "@/hooks/use-toast";

export const useCreateCompany = (onSuccess: () => void) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CompanyFormData) => {
      console.log("Step 1: Starting company creation process");
      toast({
        title: "Processing",
        description: "Starting company creation process...",
      });

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
      onSuccess();
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
};