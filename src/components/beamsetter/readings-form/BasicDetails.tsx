import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { BeamsetterFormData } from "../BeamsetterReadingsModal";
import { format } from "date-fns";

interface BasicDetailsProps {
  form: UseFormReturn<BeamsetterFormData>;
}

export const BasicDetails = ({ form }: BasicDetailsProps) => {
  return (
    <div className="space-y-4">
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

      <FormField
        control={form.control}
        name="model"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Model</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="serialNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Serial Number</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="engineer"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Engineer</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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
    </div>
  );
};