import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel: () => void;
  isSaving: boolean;
}

export const FormActions = ({ onCancel, isSaving }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="bg-white hover:bg-gray-50 border-gray-200"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isSaving}
        className="bg-primary hover:bg-primary/90 text-white"
      >
        {isSaving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
};