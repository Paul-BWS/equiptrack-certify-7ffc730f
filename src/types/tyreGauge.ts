import { Dispatch, SetStateAction } from 'react';

export interface Reading {
  target: string;
  actual: string;
  deviation: string;
}

export interface TyreGauge {
  id: string;
  company_id: string;
  cert_number: string;
  model: string;
  serial_number: string;
  engineer: string;
  min_pressure: number;
  max_pressure: number;
  units: string;
  last_service_date: string | null;
  next_service_due: string | null;
  sent_on: string | null;
  result: string;
  readings: Reading[];
  definitive_readings: Reading[];
  notes: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface FormState {
  isSaving: boolean;
  setIsSaving: (value: boolean) => void;
  certNumber: string;
  setCertNumber?: (value: string) => void;  // Make this optional
  date?: Date;
  setDate: (date?: Date) => void;
  retestDate?: Date;
  setRetestDate: (date?: Date) => void;
  model: string;
  setModel: (value: string) => void;
  serialNumber: string;
  setSerialNumber: (value: string) => void;
  engineer: string;
  setEngineer: (value: string) => void;
  min: string;
  setMin: (value: string) => void;
  max: string;
  setMax: (value: string) => void;
  units: string;
  setUnits: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
  readings: Reading[];
  setReadings: (readings: Reading[]) => void;
  definitiveReadings: Reading[];
  setDefinitiveReadings: (readings: Reading[]) => void;
  result: string;
  setResult: (value: string) => void;
}