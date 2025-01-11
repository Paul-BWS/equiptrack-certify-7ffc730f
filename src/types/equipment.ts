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
  service_date: string; // Changed from date to service_date
  service_type: string; // Changed from type to service_type
  technician: string;
  notes: string;
  next_service_date: string; // Changed from next_due_date to next_service_date
}

export interface Certificate {
  id: string;
  service_record_id: string;
  equipment_id: string;
  certification_number: string;
  issue_date: string;
  expiry_date: string;
}