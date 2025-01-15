import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { BeamsetterFormData } from "../BeamsetterReadingsModal";

interface NotesSectionProps {
  form: UseFormReturn<BeamsetterFormData>;
}

export const NotesSection = ({ form }: NotesSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="notes">Notes</Label>
      <Textarea
        id="notes"
        {...form.register("notes")}
        className="min-h-[100px] p-2 border rounded-md"
        placeholder="Add any additional notes here..."
      />
    </div>
  );
};