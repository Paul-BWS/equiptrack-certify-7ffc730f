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

  const parseReadings = useCallback((readingsData: any): Reading[] => {
    if (!readingsData) return [...defaultReadings];
    
    if (Array.isArray(readingsData)) {
      return readingsData.map(reading => ({
        target: reading.target || "",
        actual: reading.actual || "",
        deviation: reading.deviation || ""
      }));
    }
    
    try {
      const parsed = typeof readingsData === 'string' ? JSON.parse(readingsData) : readingsData;
      const readingsArray = Array.isArray(parsed) ? parsed : JSON.parse(parsed);
      return readingsArray.map((reading: Reading) => ({
        target: reading.target || "",
        actual: reading.actual || "",
        deviation: reading.deviation || ""
      }));
    } catch (e) {
      console.error('Error parsing readings:', e);
      return [...defaultReadings];
    }
  }, []);

  useEffect(() => {
    if (equipment && isOpen) {
      console.log('Setting form data from equipment:', equipment);
      
      const equipmentReadings = parseReadings(equipment.readings);
      const equipmentDefinitiveReadings = parseReadings(equipment.definitive_readings);

      setReadings({
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
        status: equipment.status || 'ACTIVE',
        sentOn: equipment.sent_on || ''
      });
    } else if (isOpen) {
      setReadings({ ...initialFormState, certNumber: generateCertificateNumber() });
    }
  }, [equipment, isOpen, parseReadings]);

  const resetForm = useCallback(() => {
    setReadings({ ...initialFormState, certNumber: generateCertificateNumber() });
  }, []);

  return { readings, setReadings, resetForm };
};