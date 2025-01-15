import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { BeamsetterFormData } from "@/types/beamsetter-form";

interface SerialNumberFieldProps {
  form: UseFormReturn<BeamsetterFormData>;
}

export const SerialNumberField = ({ form }: SerialNumberFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="serialNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm text-[#C8C8C9]">Serial Number</FormLabel>
          <FormControl>
            <Input {...field} className="h-12 bg-white border-[#E5E7EB] border-[0.5px] rounded-md text-base" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};