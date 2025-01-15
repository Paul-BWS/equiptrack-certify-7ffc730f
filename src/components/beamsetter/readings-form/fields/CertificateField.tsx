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
          <FormLabel className="text-sm text-[#C8C8C9]">Certificate Number</FormLabel>
          <FormControl>
            <Input {...field} readOnly className="h-12 bg-white border-[#E5E7EB] border-[0.5px] rounded-md" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};