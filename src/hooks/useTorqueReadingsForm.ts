import { useState, useEffect, useCallback } from "react";
import { Reading } from "@/types/equipment";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";

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
  certNumber: generateCertificateNumber(),
  date: new Date().toISOString().split('T')[0],
  retestDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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
    if (equipment && isOpen) {
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
        certNumber: equipment.cert_number || generateCertificateNumber(),
        status: equipment.status || 'ACTIVE'
      }));
    } else if (isOpen) {
      // Reset form when opening for a new torque wrench
      setReadings({ ...initialFormState, certNumber: generateCertificateNumber() });
    }
  }, [equipment, isOpen]);

  const resetForm = useCallback(() => {
    setReadings({ ...initialFormState, certNumber: generateCertificateNumber() });
  }, []);

  return { readings, setReadings, resetForm };
};