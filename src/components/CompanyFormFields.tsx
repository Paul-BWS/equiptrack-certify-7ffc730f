import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { CompanyFormData } from "@/schemas/companySchema";

interface CompanyFormFieldsProps {
  form: UseFormReturn<CompanyFormData>;
}

export const CompanyFormFields = ({ form }: CompanyFormFieldsProps) => {
  const watchUseSeparateBillingAddress = form.watch("useSeparateBillingAddress");

  return (
    <div className="space-y-4 bg-[#F9F9F9] p-4 rounded-lg">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#B3B3B3] text-[12px]">Company Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter company name" 
                {...field} 
                className="border-gray-200 rounded-lg focus-visible:ring-1 bg-white text-[#282828] text-[16px] px-4"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="industry"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#B3B3B3] text-[12px]">Industry</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter industry" 
                {...field} 
                className="border-gray-200 rounded-lg focus-visible:ring-1 bg-white text-[#282828] text-[16px] px-4"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="website"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#B3B3B3] text-[12px]">Website</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter website URL (optional)" 
                {...field} 
                className="border-gray-200 rounded-lg focus-visible:ring-1 bg-white text-[#282828] text-[16px] px-4"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#B3B3B3] text-[12px]">Site Address</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter site address" 
                {...field} 
                className="border-gray-200 rounded-lg focus-visible:ring-1 bg-white text-[#282828] text-[16px] px-4"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="useSeparateBillingAddress"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-[#B3B3B3] text-[12px]">Use separate billing address</FormLabel>
            </div>
          </FormItem>
        )}
      />
      {watchUseSeparateBillingAddress && (
        <FormField
          control={form.control}
          name="billingaddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#B3B3B3] text-[12px]">Billing Address</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter billing address" 
                  {...field} 
                  className="border-gray-200 rounded-lg focus-visible:ring-1 bg-white text-[#282828] text-[16px] px-4"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#B3B3B3] text-[12px]">Notes</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter any additional notes"
                className="resize-none border-gray-200 rounded-lg focus-visible:ring-1 bg-white text-[#282828] text-[16px] px-4"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};