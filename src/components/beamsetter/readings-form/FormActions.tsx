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
  equipmentId,
}: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-4">
      {equipmentId && onDelete && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="border-destructive text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-semibold">
                Delete Beamsetter
              </AlertDialogTitle>
              <AlertDialogDescription className="text-base text-gray-500">
                Are you sure you want to delete this beamsetter? This action cannot be undone 
                and will permanently remove all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel className="mt-0 border-gray-200">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={onDelete}
                className="bg-destructive hover:bg-destructive/90 text-base font-medium"
              >
                Delete Beamsetter
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={onCancel}
        className="bg-white hover:bg-gray-50 border-gray-200 text-base font-medium"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        size="lg"
        disabled={isSaving}
        className="bg-primary hover:bg-primary/90 text-base font-medium"
      >
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          'Save'
        )}
      </Button>
    </div>
  );
};