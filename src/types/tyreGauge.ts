export interface TyreGauge {
  id?: string;
  company_id: string;
  model: string;
  serial_number: string;
  min_pressure: number;
  max_pressure: number;
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

export interface Reading {
  target: string;
  actual: string;
  deviation: string;
}