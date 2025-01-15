import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { BeamsetterFormData } from "@/types/beamsetter-form";
import { useStaffMembers } from "@/hooks/useStaffMembers";
import { Loader2 } from "lucide-react";

interface EngineerFieldProps {
  form: UseFormReturn<BeamsetterFormData>;
}

export const EngineerField = ({ form }: EngineerFieldProps) => {
  const { data: staff, isLoading: isLoadingStaff } = useStaffMembers();

  return (
    <FormField
      control={form.control}
      name="engineer"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm text-[#C8C8C9]">Engineer</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="h-12 bg-white">
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
                <SelectItem key={engineer.id} value={engineer.name}>
                  {engineer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};