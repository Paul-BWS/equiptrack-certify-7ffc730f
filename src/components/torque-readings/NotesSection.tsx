interface NotesSectionProps {
  notes: string;
  onChange: (value: string) => void;
}

export const NotesSection = ({ notes, onChange }: NotesSectionProps) => {
  return (
    <div className="space-y-2">
      <label className="text-base text-[#C8C8C9]">Notes</label>
      <textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[100px] rounded-md border border-gray-200 bg-white px-3 py-2 text-base"
        placeholder="Enter any additional notes..."
      />
    </div>
  );
};