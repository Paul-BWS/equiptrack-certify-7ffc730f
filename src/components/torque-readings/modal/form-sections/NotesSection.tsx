import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";

interface NotesSectionProps {
  formData: TorqueReadingsForm;
  onChange: (field: keyof TorqueReadingsForm, value: string) => void;
}

export const NotesSection = ({ formData, onChange }: NotesSectionProps) => {
  return (
    <div className="space-y-2 bg-[#F9F9F9] p-6 rounded-lg">
      <label className="text-sm text-[#C8C8C9]">Notes</label>
      <textarea
        value={formData.notes}
        onChange={(e) => onChange("notes", e.target.value)}
        className="w-full min-h-[100px] rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        placeholder="Enter any additional notes..."
      />
    </div>
  );
};