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
import { BeamsetterFormData } from "@/types/beamsetter-form";
import { format } from "date-fns";
import { useStaffMembers } from "@/hooks/useStaffMembers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface BasicDetailsProps {
  form: UseFormReturn<BeamsetterFormData>;
}

export const BasicDetails = ({ form }: BasicDetailsProps) => {
  const { data: staff, isLoading: isLoadingStaff } = useStaffMembers();

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
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
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
              <SelectContent>
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