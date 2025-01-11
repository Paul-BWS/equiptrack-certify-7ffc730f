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

// Alias for backward compatibility
export type Equipment = TorqueWrench;