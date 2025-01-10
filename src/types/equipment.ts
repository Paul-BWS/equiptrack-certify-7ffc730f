export interface Equipment {
  id: string;
  name: string;
  serialNumber: string;
  manufacturer: string;
  model: string;
  purchaseDate: string;
  lastServiceDate: string;
  nextServiceDue: string;
}

export interface ServiceRecord {
  id: string;
  equipmentId: string;
  date: string;
  type: 'service' | 'calibration';
  technician: string;
  notes: string;
  nextDueDate: string;
}

export interface Certificate {
  id: string;
  serviceRecordId: string;
  equipmentId: string;
  issueDate: string;
  expiryDate: string;
  certificationNumber: string;
}