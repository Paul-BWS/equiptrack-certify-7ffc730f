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

interface ModelFieldProps {
  form: UseFormReturn<BeamsetterFormData>;
}

export const ModelField = ({ form }: ModelFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="model"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm text-[#C8C8C9]">Model</FormLabel>
          <FormControl>
            <Input {...field} className="h-12 bg-white" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};