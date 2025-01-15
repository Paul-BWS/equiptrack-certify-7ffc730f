export interface Reading {
  target: string;
  actual: string;
  deviation: string;
}

export interface FormState {
  isSaving: boolean;
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
  certNumber: string;
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