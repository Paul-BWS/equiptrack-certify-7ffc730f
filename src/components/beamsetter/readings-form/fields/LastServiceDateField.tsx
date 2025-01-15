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
          <FormLabel>Last Service Date</FormLabel>
          <FormControl>
            <Input
              type="date"
              value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
              onChange={(e) => {
                const date = new Date(e.target.value);
                field.onChange(date);
              }}
              className="bg-white"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};