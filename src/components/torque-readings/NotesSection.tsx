interface NotesSectionProps {
  notes: string;
  onChange: (notes: string) => void;
}

export const NotesSection = ({ notes, onChange }: NotesSectionProps) => {
  return (
    <div className="space-y-2 bg-[#F1F1F1] p-6 rounded-lg">
      <label className="text-base text-[#C8C8C9]">Notes</label>
      <textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[100px] rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        placeholder="Enter any additional notes..."
      />
    </div>
  );
};