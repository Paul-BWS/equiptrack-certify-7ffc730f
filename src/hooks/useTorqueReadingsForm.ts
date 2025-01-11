import { useState, useEffect } from "react";
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

export const useTorqueReadingsForm = (equipment: any, isOpen: boolean) => {
  const [readings, setReadings] = useState<TorqueReadingsForm>({
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
  });

  useEffect(() => {
    if (equipment) {
      console.log('Loading equipment data:', equipment);
      
      const equipmentReadings = equipment.readings?.length ? 
        equipment.readings : defaultReadings;
      
      const equipmentDefinitiveReadings = equipment.definitive_readings?.length ? 
        equipment.definitive_readings : equipmentReadings;

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

  return { readings, setReadings };
};