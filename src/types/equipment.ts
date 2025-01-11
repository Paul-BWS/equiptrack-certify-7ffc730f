export interface Equipment {
  id: string;
  name: string;
  serial_number: string;
  manufacturer: string;
  model: string;
  purchase_date: string;
  last_service_date: string;
  next_service_due: string;
  company_id: string;
}

export interface ServiceRecord {
  id: string;
  equipment_id: string;
  service_date: string;
  service_type: string;
  technician: string;
  notes: string;
  next_service_date: string; // Changed from retest_date to next_service_date
}

export interface Certificate {
  id: string;
  service_record_id: string;
  equipment_id: string;
  certification_number: string;
  issue_date: string;
  expiry_date: string;
}