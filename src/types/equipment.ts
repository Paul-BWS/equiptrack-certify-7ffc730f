export interface Equipment {
  id: string;
  model: string;
  serial_number: string;
  last_service_date: string;
  next_service_due: string;
  companyName?: string;
  equipmentType?: string;
}

export interface TorqueWrench {
  id: string;
  company_id: string;
  model: string;
  serial_number: string;
  min_torque?: number;
  max_torque?: number;
  units?: string;
  last_service_date: string;
  next_service_due: string;
  engineer?: string;
  result?: string;
  notes?: string;
  cert_number?: string;
  status?: string;
  target1?: string;
  actual1?: string;
  deviation1?: string;
  target2?: string;
  actual2?: string;
  deviation2?: string;
  target3?: string;
  actual3?: string;
  deviation3?: string;
  def_target1?: string;
  def_actual1?: string;
  def_deviation1?: string;
  def_target2?: string;
  def_actual2?: string;
  def_deviation2?: string;
  def_target3?: string;
  def_actual3?: string;
  def_deviation3?: string;
}

export interface ServiceRecord {
  id?: string;
  equipment_id?: string;
  service_date: string;
  service_type: string;
  technician: string;
  notes?: string;
  next_service_date?: string;
}

export interface Reading {
  target: string;
  actual: string;
  deviation: string;
}

export interface Certificate {
  id: string;
  equipment_id?: string;
  certification_number: string;
  issue_date: string;
  expiry_date: string;
}

export interface LiftingEquipment {
  id: string;
  company_id: string;
  cert_number?: string;
  model: string;
  serial_number: string;
  engineer?: string;
  capacity?: number;
  units?: string;
  test_result?: string;
  last_service_date: string;
  next_service_due: string;
  status?: string;
  notes?: string;
  result: string;
  platform_condition?: string;
  control_box_condition?: string;
  hydraulic_hoses_condition?: string;
  main_structure_inspection?: string;
  oil_levels?: string;
  rollers_and_guides?: string;
  safety_mechanism?: string;
  scissor_operation?: string;
  securing_bolts?: string;
  toe_guards?: string;
  lubrication_moving_parts?: string;
}
