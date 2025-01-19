import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

interface FormActionsProps {
  onCancel: () => void;
  onDelete?: () => void;
  isSaving: boolean;
  equipmentId: string | null;
}

export const FormActions = ({
  onCancel,
  onDelete,
  isSaving,
  equipmentId
}: FormActionsProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        {equipmentId && onDelete && (
          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
};