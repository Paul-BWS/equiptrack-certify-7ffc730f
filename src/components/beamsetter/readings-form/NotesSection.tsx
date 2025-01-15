import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { BeamsetterFormData } from "@/types/beamsetter-form";

interface NotesSectionProps {
  form: UseFormReturn<BeamsetterFormData>;
}

export const NotesSection = ({ form }: NotesSectionProps) => {
  return (
    <div className="space-y-2 bg-[#F9F9F9] p-6 rounded-lg">
      <Label htmlFor="notes" className="text-sm text-[#C8C8C9]">Notes</Label>
      <Textarea
        id="notes"
        {...form.register("notes")}
        className="min-h-[100px] p-2 border rounded-md bg-white"
        placeholder="Add any additional notes here..."
      />
    </div>
  );
};