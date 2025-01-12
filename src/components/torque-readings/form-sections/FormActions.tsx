import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

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
          onClick={onDelete}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      )}
      <Button
        type="submit"
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
};