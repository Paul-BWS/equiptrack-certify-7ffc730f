import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { TorqueWrenchFormData } from "@/hooks/useTorqueWrenchReadingsForm";

interface NotesSectionProps {
  form: UseFormReturn<TorqueWrenchFormData>;
}

export const NotesSection = ({ form }: NotesSectionProps) => {
  return (
    <div className="bg-[#F9F9F9] p-6 rounded-lg">
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm text-[#C8C8C9]">Notes</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                className="min-h-[100px] p-2 border-[#E5E7EB] border-[0.5px] rounded-md bg-white text-base"
                placeholder="Add any additional notes here..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};