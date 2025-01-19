import { Textarea } from "@/components/ui/textarea";

interface NotesSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const NotesSection = ({ value, onChange }: NotesSectionProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm text-[#C8C8C9]">Notes</label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[100px] p-2 border rounded-md border-gray-200 bg-white placeholder:text-[#C8C8C9]"
        placeholder="Add any additional notes here..."
      />
    </div>
  );
};