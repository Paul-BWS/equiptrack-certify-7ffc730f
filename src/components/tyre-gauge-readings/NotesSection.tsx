import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface NotesSectionProps {
  notes: string;
  onChange: (value: string) => void;
}

export const NotesSection = ({ notes, onChange }: NotesSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="notes" className="text-sm text-[#C8C8C9]">Notes</Label>
      <Textarea
        id="notes"
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[100px] p-2 border rounded-md border-gray-200 bg-white placeholder:text-[#C8C8C9]"
        placeholder="Add any additional notes here..."
      />
    </div>
  );
};