export interface LiftingEquipmentReadings {
  certNumber: string;
  model: string;
  serialNumber: string;
  engineer: string;
  date: string;
  retestDate: string;
  capacity: string;
  units: string;
  result: string;
  status: string;
  notes: string;
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

export interface FormProps {
  readings: LiftingEquipmentReadings;
  setReadings: (readings: LiftingEquipmentReadings) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onDelete?: () => void;
  isSaving: boolean;
  equipmentId: string | null;
}