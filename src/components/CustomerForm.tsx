import { type ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";

// Simplified schema with just company name
const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
});

type CompanyFormData = z.infer<typeof companySchema>;

export const CustomerForm = (): ReactElement => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CompanyFormData) => {
    console.log("Form submission started with data:", data);
    
    if (isSubmitting) {
      console.log("Preventing double submission");
      return;
    }

    setIsSubmitting(true);

    try {
      toast({
        title: "Processing",
        description: "Creating new company...",
      });

      const { error } = await supabase
        .from('companies')
        .insert([{
          name: data.name,
          // Set some default values for required fields
          industry: "Not specified",
          address: "Not specified",
        }]);

      if (error) {
        console.error("Error creating company:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to create company",
          variant: "destructive",
        });
        return;
      }

      console.log("Company created successfully");
      
      form.reset();
      setOpen(false);

      toast({
        title: "Success",
        description: "Company created successfully!",
      });

    } catch (error) {
      console.error("Caught error in form submission:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create company",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          variant="default"
        >
          <Plus className="h-4 w-4" />
          New Company
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#f9fafb] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Company</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90" 
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