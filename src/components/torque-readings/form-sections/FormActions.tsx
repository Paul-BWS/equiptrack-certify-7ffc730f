import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onClose: () => void;
  onDelete?: () => void;
  isSaving: boolean;
  equipmentId: string | null;
}

export const FormActions = ({
  onClose,
  onDelete,
  isSaving,
  equipmentId
}: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-4">
      {equipmentId && onDelete && (
        <Button
          type="button"
          variant="destructive"
          onClick={onDelete}
        >
          Delete
        </Button>
      )}
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