import { useState, useEffect, useCallback } from "react";
import { Reading } from "@/types/equipment";

export interface TorqueReadingsForm {
  certNumber: string;
  date: string;
  retestDate: string;
  model: string;
  serialNumber: string;
  engineer: string;
  min: string;
  max: string;
  units: string;
  status: string;
  sentOn: string;
  result: string;
  notes: string;
  readings: Reading[];
  definitiveReadings: Reading[];
}

const defaultReadings = [
  { target: "", actual: "", deviation: "" },
  { target: "", actual: "", deviation: "" },
  { target: "", actual: "", deviation: "" }
];

const initialFormState: TorqueReadingsForm = {
  certNumber: "",
  date: new Date().toISOString().split('T')[0],
  retestDate: "",
  model: "",
  serialNumber: "",
  engineer: "",
  min: "",
  max: "",
  units: "nm",
  status: "ACTIVE",
  sentOn: "",
  result: "PASS",
  notes: "",
  readings: [...defaultReadings],
  definitiveReadings: [...defaultReadings],
};

export const useTorqueReadingsForm = (equipment: any, isOpen: boolean) => {
  const [readings, setReadings] = useState<TorqueReadingsForm>({ ...initialFormState });

  const parseReadings = (readingsStr: string | Reading[]) => {
    if (typeof readingsStr === 'string') {
      try {
        return JSON.parse(readingsStr);
      } catch (e) {
        console.error('Error parsing readings:', e);
        return defaultReadings;
      }
    }
    return readingsStr || defaultReadings;
  };

  useEffect(() => {
    if (equipment) {
      console.log('Loading equipment data:', equipment);
      
      const equipmentReadings = parseReadings(equipment.readings);
      const equipmentDefinitiveReadings = parseReadings(equipment.definitive_readings);

      setReadings(prev => ({
        ...prev,
        model: equipment.model || '',
        serialNumber: equipment.serial_number || '',
        min: equipment.min_torque?.toString() || '',
        max: equipment.max_torque?.toString() || '',
        units: equipment.units || 'nm',
        date: equipment.last_service_date || new Date().toISOString().split('T')[0],
        retestDate: equipment.next_service_due || '',
        engineer: equipment.engineer || '',
        result: equipment.result || 'PASS',
        notes: equipment.notes || '',
        readings: equipmentReadings,
        definitiveReadings: equipmentDefinitiveReadings,
        certNumber: equipment.cert_number || '',
        status: equipment.status || 'ACTIVE'
      }));
    }
  }, [equipment]);

  const resetForm = useCallback(() => {
    setReadings({ ...initialFormState });
  }, []);

  return { readings, setReadings, resetForm };
};