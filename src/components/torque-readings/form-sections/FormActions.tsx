import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onClose: () => void;
  isSaving: boolean;
  onDelete?: () => void;
  equipmentId?: string | null;
}

export const FormActions = ({ onClose, isSaving, onDelete, equipmentId }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-4">
      {equipmentId && onDelete && (
        <Button
          type="button"
          variant="destructive"
          size="lg"
          onClick={onDelete}
        >
          Delete
        </Button>
      )}
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={onClose}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        size="lg"
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
};