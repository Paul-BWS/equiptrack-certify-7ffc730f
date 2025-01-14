import { FormActions } from "@/components/torque-readings/form-sections/FormActions";
import { NotesSection } from "@/components/torque-readings/form-sections/NotesSection";
import { Dispatch, SetStateAction } from "react";
import { BasicDetailsSection } from "./form-sections/BasicDetailsSection";
import { InspectionChecklist } from "./form-sections/InspectionChecklist";

interface LiftingEquipmentReadings {
  date: string;
  retestDate: string;
  certNumber?: string;
  model: string;
  serialNumber: string;
  engineer?: string;
  result: string;
  notes?: string;
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
  setReadings: Dispatch<SetStateAction<LiftingEquipmentReadings>>;
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
  const handleFieldChange = (field: keyof LiftingEquipmentReadings, value: string) => {
    setReadings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 p-6">
      <BasicDetailsSection
        model={readings.model}
        serialNumber={readings.serialNumber}
        engineer={readings.engineer}
        date={readings.date}
        retestDate={readings.retestDate}
        result={readings.result}
        onFieldChange={handleFieldChange}
      />

      <InspectionChecklist
        items={inspectionItems}
        values={readings}
        onFieldChange={handleFieldChange}
      />

      <NotesSection
        notes={readings.notes || ""}
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