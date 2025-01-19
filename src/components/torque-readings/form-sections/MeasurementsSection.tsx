import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { TorqueWrenchFormData } from "@/hooks/useTorqueWrenchReadingsForm";

interface MeasurementsSectionProps {
  form: UseFormReturn<TorqueWrenchFormData>;
}

export const MeasurementsSection = ({ form }: MeasurementsSectionProps) => {
  return (
    <div className="bg-[#F9F9F9] p-6 rounded-lg space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="min"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-[#C8C8C9]">Min Torque</FormLabel>
              <FormControl>
                <Input {...field} type="number" className="h-12 bg-white border-[#E5E7EB] border-[0.5px] rounded-md text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="max"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-[#C8C8C9]">Max Torque</FormLabel>
              <FormControl>
                <Input {...field} type="number" className="h-12 bg-white border-[#E5E7EB] border-[0.5px] rounded-md text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
      </div>
    </div>
  );
};