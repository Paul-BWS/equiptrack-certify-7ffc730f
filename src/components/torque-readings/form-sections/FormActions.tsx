import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onClose: () => void;
  isSaving: boolean;
}

export const FormActions = ({ onClose, isSaving }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={onClose}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
};