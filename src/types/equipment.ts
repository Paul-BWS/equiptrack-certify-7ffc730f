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
  model?: string;
  serial_number?: string;
  min_torque?: number;
  max_torque?: number;
  units?: string;
  last_service_date?: string;
  next_service_due?: string;
  engineer?: string;
  result?: string;
  notes?: string;
  readings?: any[];
  definitive_readings?: any[];
  cert_number?: string;
  status?: string;
}

export interface ServiceRecord {
  id?: string;
  torque_wrench_id?: string;
  service_date: string;
  service_type: string;
  technician: string;
  notes?: string;
}