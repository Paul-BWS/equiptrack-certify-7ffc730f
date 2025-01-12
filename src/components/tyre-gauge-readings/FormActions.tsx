import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface FormActionsProps {
  onCancel: () => void;
  onDelete?: () => void;
  isSaving: boolean;
  showDelete?: boolean;
}

export const FormActions = ({ 
  onCancel, 
  onDelete, 
  isSaving,
  showDelete = false 
}: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-4">
      {showDelete && onDelete && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this tyre gauge and all its readings.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="bg-red-500 hover:bg-red-600">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
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