export interface TorqueWrench {
  id: string;
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
  notes: string;
  readings: Array<{
    target: string;
    actual: string;
    deviation: string;
  }>;
  definitive_readings: Array<{
    target: string;
    actual: string;
    deviation: string;
  }>;
  cert_number: string;
  status: string;
}

export interface Certificate {
  id: string;
  torque_wrench_id: string;
  certification_number: string;
  issue_date: string;
  expiry_date: string;
}