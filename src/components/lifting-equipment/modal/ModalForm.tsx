import { FormActions } from "@/components/torque-readings/form-sections/FormActions";
import { HeaderSection } from "@/components/torque-readings/HeaderSection";
import { NotesSection } from "@/components/torque-readings/form-sections/NotesSection";

interface LiftingEquipmentReadings {
  date: string;
  retestDate: string;
  certNumber: string;
  model: string;
  serialNumber: string;
  engineer: string;
  result: string;
  notes: string;
  status: string;
}

interface ModalFormProps {
  readings: LiftingEquipmentReadings;
  setReadings: (readings: LiftingEquipmentReadings) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  onDelete?: () => void;
  isSaving: boolean;
  equipmentId: string | null;
}

export const ModalForm = ({
  readings,
  setReadings,
  onSubmit,
  onClose,
  onDelete,
  isSaving,
  equipmentId,
}: ModalFormProps) => {
  const handleFieldChange = (field: keyof LiftingEquipmentReadings, value: string) => {
    setReadings({ ...readings, [field]: value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 p-6">
      <HeaderSection
        date={readings.date}
        status={readings.status}
        retestDate={readings.retestDate}
        certNumber={readings.certNumber}
        onDateChange={(value) => handleFieldChange("date", value)}
        onRetestDateChange={(value) => handleFieldChange("retestDate", value)}
      />

      <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-[#C8C8C9]">Model</label>
            <input
              type="text"
              value={readings.model}
              onChange={(e) => handleFieldChange("model", e.target.value)}
              className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-[#C8C8C9]">Serial Number</label>
            <input
              type="text"
              value={readings.serialNumber}
              onChange={(e) => handleFieldChange("serialNumber", e.target.value)}
              className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-[#C8C8C9]">Engineer</label>
            <input
              type="text"
              value={readings.engineer}
              onChange={(e) => handleFieldChange("engineer", e.target.value)}
              className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-[#C8C8C9]">Result</label>
            <select
              value={readings.result}
              onChange={(e) => handleFieldChange("result", e.target.value)}
              className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
            >
              <option value="">Select result</option>
              <option value="PASS">Pass</option>
              <option value="FAIL">Fail</option>
            </select>
          </div>
        </div>
      </div>

      <NotesSection
        notes={readings.notes}
        onChange={(value) => handleFieldChange("notes", value)}
      />

      <FormActions
        onClose={onClose}
        onDelete={onDelete}
        isSaving={isSaving}
        equipmentId={equipmentId}
      />
    </form>
  );
};