export interface Reading {
  target: string;
  actual: string;
  deviation: string;
}

export interface TorqueWrench {
  id?: string;
  company_id: string;
  model: string;
  serial_number: string;
  min_torque: number;
  max_torque: number;
  units: string;
  last_service_date: string;
  next_service_due: string;
  engineer: string;
  result: string;
  notes: string | null;
  readings: Reading[];
  definitive_readings: Reading[];
  cert_number: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface LiftingEquipment {
  id?: string;
  company_id: string;
  model: string | null;
  serial_number: string | null;
  engineer: string | null;
  last_service_date: string | null;
  next_service_due: string | null;
  notes: string | null;
  cert_number: string | null;
  status: string | null;
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
  created_at?: string;
  updated_at?: string;
}

export interface Certificate {
  id: string;
  torque_wrench_id: string;
  certification_number: string;
  issue_date: string;
  expiry_date: string;
}

export interface ServiceRecord {
  id: string;
  torque_wrench_id: string;
  service_date: string;
  service_type: string;
  technician: string;
  notes: string;
  next_service_date: string;
}