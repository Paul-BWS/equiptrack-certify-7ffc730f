import { UseFormReturn } from "react-hook-form";

interface NotesSectionProps {
  form: UseFormReturn<any>;
}

export const NotesSection = ({ form }: NotesSectionProps) => {
  return (
    <div className="bg-[#F9F9F9] p-6 rounded-lg space-y-2">
      <label className="text-sm text-[#C8C8C9]">Notes</label>
      <textarea
        {...form.register("notes")}
        className="w-full min-h-[100px] rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        placeholder="Enter any additional notes..."
      />
    </div>
  );
};