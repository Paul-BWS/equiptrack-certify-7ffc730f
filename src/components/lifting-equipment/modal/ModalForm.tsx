import { FormActions } from "@/components/torque-readings/form-sections/FormActions";
import { HeaderSection } from "@/components/torque-readings/HeaderSection";
import { NotesSection } from "@/components/torque-readings/form-sections/NotesSection";
import { useStaffMembers } from "@/hooks/useStaffMembers";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerField } from "@/components/tyre-gauge-readings/form-fields/DatePickerField";

interface LiftingEquipmentReadings {
  date: string;
  retestDate: string;
  certNumber: string;
  model: string;
  serialNumber: string;
  engineer?: string; // Made optional to match database schema
  result: string;
  notes: string;
  status: string;
  platform_condition: string;
  control_box_condition: string;
  hydraulic_hoses_condition: string;
  main_structure_inspection: string;
  oil_levels: string;
  rollers_and_guides: string;
  safety_mechanism: string;
  scissor_operation: string;
  securing_bolts: string;
  toe_guards: string;
  lubrication_moving_parts: string;
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

const inspectionItems = [
  { key: 'platform_condition', label: 'Check Condition Of Platform' },
  { key: 'control_box_condition', label: 'Check Condition Control Box' },
  { key: 'hydraulic_hoses_condition', label: 'Check Condition Hydraulic Hoses' },
  { key: 'main_structure_inspection', label: 'Visual Inspection Of Main Structure' },
  { key: 'oil_levels', label: 'Check Oil Levels' },
  { key: 'rollers_and_guides', label: 'Check Rollers And Guides' },
  { key: 'safety_mechanism', label: 'Check Safety Mechanism' },
  { key: 'scissor_operation', label: 'Check Scissor Operation' },
  { key: 'securing_bolts', label: 'Check Securing Bolts' },
  { key: 'toe_guards', label: 'Check Toe Guards' },
  { key: 'lubrication_moving_parts', label: 'Check Lubrication Moving Parts' },
] as const;

export const ModalForm = ({
  readings,
  setReadings,
  onSubmit,
  onClose,
  onDelete,
  isSaving,
  equipmentId,
}: ModalFormProps) => {
  const { data: staff, isLoading: isLoadingStaff } = useStaffMembers();
  
  const handleFieldChange = (field: keyof LiftingEquipmentReadings, value: string) => {
    setReadings({ ...readings, [field]: value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 p-6">
      <div className="space-y-4">
        <DatePickerField
          label="Test Date"
          date={readings.date}
          onDateChange={(value) => handleFieldChange("date", value)}
        />
        <DatePickerField
          label="Retest Date"
          date={readings.retestDate}
          onDateChange={(value) => handleFieldChange("retestDate", value)}
        />
      </div>

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
            <Select 
              value={readings.engineer} 
              onValueChange={(value) => handleFieldChange("engineer", value)}
            >
              <SelectTrigger className="h-12 bg-white border-gray-200">
                {isLoadingStaff ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading engineers...</span>
                  </div>
                ) : (
                  <SelectValue placeholder="Select an engineer" />
                )}
              </SelectTrigger>
              <SelectContent>
                {staff?.map((engineer) => (
                  <SelectItem 
                    key={engineer.id} 
                    value={engineer.name}
                  >
                    {engineer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

      <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Inspection Checklist</h3>
        <div className="space-y-4">
          {inspectionItems.map(({ key, label }) => (
            <div key={key} className="grid grid-cols-1 md:grid-cols-[2fr,3fr,1fr] gap-4 items-center">
              <span className="text-gray-500">{label}</span>
              <input
                type="text"
                placeholder="Enter description"
                className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
              />
              <Select 
                value={readings[key as keyof LiftingEquipmentReadings]} 
                onValueChange={(value) => handleFieldChange(key as keyof LiftingEquipmentReadings, value)}
              >
                <SelectTrigger className="h-12 bg-white border-gray-200">
                  <SelectValue placeholder="Result" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PASS">Pass</SelectItem>
                  <SelectItem value="FAIL">Fail</SelectItem>
                  <SelectItem value="RECTIFY">Rectify</SelectItem>
                  <SelectItem value="N/A">N/A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
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