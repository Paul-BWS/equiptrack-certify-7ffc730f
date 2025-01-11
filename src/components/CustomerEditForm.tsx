import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Customer } from "@/types/customer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { CustomerBasicInfo } from "./customer-edit/CustomerBasicInfo";
import { CustomerContactInfo } from "./customer-edit/CustomerContactInfo";
import { CustomerAddressInfo } from "./customer-edit/CustomerAddressInfo";

const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Site address is required"),
  useSeparateBillingAddress: z.boolean().default(false),
  billingAddress: z.string().min(1, "Billing address is required").optional(),
  company: z.string().min(1, "Company name is required"),
  website: z.string().url("Invalid website URL").or(z.string().length(0)),
  notes: z.string(),
  industry: z.string().min(1, "Industry is required"),
});

type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerEditFormProps {
  customer: Customer;
}

export const CustomerEditForm = ({ customer }: CustomerEditFormProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      useSeparateBillingAddress: customer.useSeparateBillingAddress,
      billingAddress: customer.billingAddress,
      company: customer.company,
      website: customer.website,
      notes: customer.notes,
      industry: customer.industry,
    },
  });

  const { mutate: updateCustomer, isPending } = useMutation({
    mutationFn: async (data: CustomerFormData) => {
      const customerData = {
        ...data,
        billingAddress: data.useSeparateBillingAddress ? data.billingAddress : data.address,
      };
      
      const { data: updatedCustomer, error } = await supabase
        .from("customers")
        .update(customerData)
        .eq('id', customer.id)
        .select()
        .single();

      if (error) throw error;
      return updatedCustomer as Customer;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer", customer.id] });
      toast({
        title: "Success",
        description: "Customer has been updated successfully",
      });
      setOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update customer. Please try again.",
        variant: "destructive",
      });
      console.error("Error updating customer:", error);
    },
  });

  const onSubmit = (data: CustomerFormData) => {
    updateCustomer(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CustomerBasicInfo form={form} />
            <CustomerContactInfo form={form} />
            <CustomerAddressInfo form={form} />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter any additional notes"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Updating..." : "Update Customer"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};