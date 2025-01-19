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
import { useStaffMembers } from "@/hooks/useStaffMembers";
import { Loader2 } from "lucide-react";
import { TorqueWrenchFormData } from "@/hooks/useTorqueWrenchReadingsForm";
import { format } from "date-fns";

interface BasicDetailsSectionProps {
  form: UseFormReturn<TorqueWrenchFormData>;
}

export const BasicDetailsSection = ({ form }: BasicDetailsSectionProps) => {
  const { data: staff, isLoading: isLoadingStaff } = useStaffMembers();

  return (
    <div className="space-y-6">
      <div className="bg-[#F9F9F9] p-6 rounded-lg space-y-4">
        <FormField
          control={form.control}
          name="certNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-[#C8C8C9]">Certificate Number</FormLabel>
              <FormControl>
                <Input {...field} readOnly className="h-12 bg-gray-50 border-[#E5E7EB] border-[0.5px] rounded-md text-base cursor-not-allowed" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="bg-[#F9F9F9] p-6 rounded-lg space-y-4">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-[#C8C8C9]">Model</FormLabel>
              <FormControl>
                <Input {...field} className="h-12 bg-white border-[#E5E7EB] border-[0.5px] rounded-md text-base" />
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
              <FormLabel className="text-sm text-[#C8C8C9]">Serial Number</FormLabel>
              <FormControl>
                <Input {...field} className="h-12 bg-white border-[#E5E7EB] border-[0.5px] rounded-md text-base" />
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
              <FormLabel className="text-sm text-[#C8C8C9]">Engineer</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 bg-white border-[#E5E7EB] border-[0.5px] rounded-md text-base">
                    {isLoadingStaff ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Loading engineers...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder="Select an engineer" />
                    )}
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  {staff?.map((engineer) => (
                    <SelectItem key={engineer.id} value={engineer.name} className="text-base">
                      {engineer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-[#C8C8C9]">Last Service Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={field.value ? format(new Date(field.value), 'yyyy-MM-dd') : ''}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    field.onChange(format(date, 'yyyy-MM-dd'));
                  }}
                  className="h-12 bg-white border-[#E5E7EB] border-[0.5px] rounded-md text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};