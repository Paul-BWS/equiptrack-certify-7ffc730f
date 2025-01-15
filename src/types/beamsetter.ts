export interface Beamsetter {
  id: string;
  company_id: string;
  cert_number?: string;
  model?: string;
  serial_number?: string;
  engineer?: string;
  last_service_date?: string;
  next_service_due?: string;
  status?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface BeamsetterFormData {
  certNumber: string;
  date?: Date;
  retestDate?: Date;
  model: string;
  serialNumber: string;
  engineer: string;
  status: string;
  notes: string;
}