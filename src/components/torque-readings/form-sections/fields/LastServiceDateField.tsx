import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { addDays, format } from "date-fns";

interface LastServiceDateFieldProps {
  form: UseFormReturn<any>;
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
                // Set retest date to 364 days after the selected date
                const retestDate = addDays(date, 364);
                form.setValue('retestDate', retestDate);
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