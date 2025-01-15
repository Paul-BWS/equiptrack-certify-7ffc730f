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

export interface FormState {
  isSaving: boolean;
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
  certNumber: string;
  setCertNumber: (value: string) => void;
  date?: Date;
  setDate: (date?: Date) => void;
  retestDate?: Date;
  setRetestDate: (date?: Date) => void;
  model: string;
  setModel: (model: string) => void;
  serialNumber: string;
  setSerialNumber: (serialNumber: string) => void;
  engineer: string;
  setEngineer: (engineer: string) => void;
  min: string;
  setMin: (min: string) => void;
  max: string;
  setMax: (max: string) => void;
  units: string;
  setUnits: (units: string) => void;
  status: string;
  setStatus: (status: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  readings: Reading[];
  setReadings: (readings: Reading[]) => void;
  definitiveReadings: Reading[];
  setDefinitiveReadings: (readings: Reading[]) => void;
  result: string;
  setResult: (result: string) => void;
}