interface FormActionsProps {
  onCancel: () => void;
  isSaving: boolean;
  equipmentId: string | null;
}

export const FormActions = ({ onCancel, isSaving, equipmentId }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-4">
      <button
        type="button"
        onClick={onCancel}
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