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

interface CertificateFieldProps {
  form: UseFormReturn<BeamsetterFormData>;
}

export const CertificateField = ({ form }: CertificateFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="certNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Certificate Number</FormLabel>
          <FormControl>
            <Input {...field} readOnly />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};