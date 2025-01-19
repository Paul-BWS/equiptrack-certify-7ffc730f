import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { useEffect } from "react";

interface SerialNumberFieldProps {
  form: UseFormReturn<any>;
}

export const SerialNumberField = ({ form }: SerialNumberFieldProps) => {
  useEffect(() => {
    // Only set default value if the field is empty
    if (!form.getValues("serialNumber")) {
      const randomNum = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit number
      form.setValue("serialNumber", `BWS-${randomNum}`);
    }
  }, [form]);

  return (
    <FormField
      control={form.control}
      name="serialNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm text-[#C8C8C9]">Serial Number</FormLabel>
          <FormControl>
            <Input 
              {...field} 
              className="h-12 bg-white border-[#E5E7EB] border-[0.5px] rounded-md text-base"
              readOnly // Make the field read-only
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};