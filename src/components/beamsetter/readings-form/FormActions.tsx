import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel: () => void;
  isSaving: boolean;
}

export const FormActions = ({ onCancel, isSaving }: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
};