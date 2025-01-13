export interface CompanyResponse {
  id: string;
  name: string;
}

export interface TorqueWrenchResponse {
  id: string;
  model: string | null;
  serial_number: string | null;
  last_service_date: string | null;
  next_service_due: string | null;
  company_id: string;
}

export interface TyreGaugeResponse {
  id: string;
  model: string | null;
  serial_number: string | null;
  last_service_date: string | null;
  next_service_due: string | null;
  company_id: string;
}

export interface Equipment {
  id: string;
  model: string;
  serialNumber: string;
  lastServiceDate: string;
  nextServiceDue: string;
  companyName?: string;
  equipmentType?: string;
}

export interface EquipmentWithActions extends Equipment {
  onGenerateCertificate: () => void;
  onDelete: () => void;
  onViewReadings: () => void;
}