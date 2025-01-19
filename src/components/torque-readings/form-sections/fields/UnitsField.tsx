import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface UnitsFieldProps {
  form: UseFormReturn<any>;
}

export const UnitsField = ({ form }: UnitsFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="units"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm text-[#C8C8C9]">Units</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="h-12 bg-white border-[#E5E7EB] border-[0.5px] rounded-md text-base">
                <SelectValue placeholder="Select units" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="nm">Nm</SelectItem>
              <SelectItem value="ft-lb">ft-lb</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};