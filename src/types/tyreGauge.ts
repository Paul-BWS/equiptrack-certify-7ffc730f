import { Dispatch, SetStateAction } from 'react';

export interface Reading {
  target: string;
  actual: string;
  deviation: string;
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