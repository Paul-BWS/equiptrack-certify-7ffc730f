import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface CertificateFieldProps {
  form: UseFormReturn<any>;
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
            <Input {...field} readOnly className="h-12 bg-white border-[#E5E7EB] border-[0.5px] rounded-md text-base" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};