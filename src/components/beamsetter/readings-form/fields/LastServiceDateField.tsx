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
import { format } from "date-fns";

interface LastServiceDateFieldProps {
  form: UseFormReturn<BeamsetterFormData>;
}

export const LastServiceDateField = ({ form }: LastServiceDateFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="lastServiceDate"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm text-[#C8C8C9]">Last Service Date</FormLabel>
          <FormControl>
            <Input
              type="date"
              value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
              onChange={(e) => {
                const date = new Date(e.target.value);
                field.onChange(date);
              }}
              className="h-12 bg-white border-[#E5E7EB] border-[0.5px] rounded-md text-base"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};