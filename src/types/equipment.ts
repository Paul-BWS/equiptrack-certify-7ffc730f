export interface Equipment {
  id: string;
  name: string;
  serial_number: string;
  manufacturer: string;
  model: string;
  purchase_date: string;
  last_service_date: string;
  next_service_due: string;
}

export interface ServiceRecord {
  id: string;
  equipment_id: string;
  date: string;
  type: 'service' | 'calibration';
  technician: string;
  notes: string;
  next_due_date: string;
}

export interface Certificate {
  id: string;
  service_record_id: string;
  equipment_id: string;
  certification_number: string;
  issue_date: string;
  expiry_date: string;
}