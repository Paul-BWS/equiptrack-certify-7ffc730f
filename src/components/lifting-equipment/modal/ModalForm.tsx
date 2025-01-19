import { FormActions } from "@/components/torque-readings/form-sections/FormActions";
import { NotesSection } from "@/components/torque-readings/form-sections/NotesSection";
import { Dispatch, SetStateAction } from "react";
import { BasicDetailsSection } from "./form-sections/BasicDetailsSection";
import { InspectionChecklist } from "./form-sections/InspectionChecklist";
import { UseFormReturn, useForm } from "react-hook-form";

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
  onCancel: () => void;
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
  onCancel,
  onDelete,
  isSaving,
  equipmentId,
}: ModalFormProps) => {
  const form = useForm({
    defaultValues: {
      notes: readings.notes || "",
      // ... other form fields
    }
  });

  const handleFieldChange = (field: keyof LiftingEquipmentReadings, value: string) => {
    setReadings(prev => ({ ...prev, [field]: value }));
  };

  const inspectionValues: Partial<Record<string, string>> = {
    platform_condition: readings.platform_condition,
    control_box_condition: readings.control_box_condition,
    hydraulic_hoses_condition: readings.hydraulic_hoses_condition,
    main_structure_inspection: readings.main_structure_inspection,
    oil_levels: readings.oil_levels,
    rollers_and_guides: readings.rollers_and_guides,
    safety_mechanism: readings.safety_mechanism,
    scissor_operation: readings.scissor_operation,
    securing_bolts: readings.securing_bolts,
    toe_guards: readings.toe_guards,
    lubrication_moving_parts: readings.lubrication_moving_parts,
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
        values={inspectionValues}
        onFieldChange={handleFieldChange}
      />

      <NotesSection form={form} />

      <FormActions
        onCancel={onCancel}
        onDelete={onDelete}
        isSaving={isSaving}
        equipmentId={equipmentId}
      />
    </form>
  );
};
