import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface MaxTorqueFieldProps {
  form: UseFormReturn<any>;
}

export const MaxTorqueField = ({ form }: MaxTorqueFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="max"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm text-[#C8C8C9]">Max Torque</FormLabel>
          <FormControl>
            <Input {...field} type="number" className="h-12 bg-white border-[#E5E7EB] border-[0.5px] rounded-md text-base" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};