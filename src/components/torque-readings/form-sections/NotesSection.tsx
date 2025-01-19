import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";

interface NotesSectionProps {
  notes: string;
  onChange: (value: string) => void;
}

export const NotesSection = ({ notes, onChange }: NotesSectionProps) => {
  return (
    <div className="bg-[#F9F9F9] p-6 rounded-lg space-y-2">
      <label className="text-sm text-[#C8C8C9]">Notes</label>
      <textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[100px] rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        placeholder="Enter any additional notes..."
      />
    </div>
  );
};