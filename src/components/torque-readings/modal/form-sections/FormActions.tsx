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
        <button
          type="button"
          onClick={onDelete}
          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      )}
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isSaving}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {isSaving ? "Saving..." : "Save"}
      </button>
    </div>
  );
};