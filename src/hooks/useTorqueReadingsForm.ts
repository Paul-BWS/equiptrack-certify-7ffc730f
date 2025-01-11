import { useState, useEffect } from "react";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";

interface Reading {
  target: string;
  actual: string;
  deviation: string;
}

interface TorqueReadingsForm {
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
    readings: [
      { target: "", actual: "", deviation: "" },
      { target: "", actual: "", deviation: "" },
      { target: "", actual: "", deviation: "" },
    ],
    definitiveReadings: [
      { target: "", actual: "", deviation: "" },
      { target: "", actual: "", deviation: "" },
      { target: "", actual: "", deviation: "" },
    ],
  });

  useEffect(() => {
    if (isOpen) {
      setReadings(prev => ({
        ...prev,
        certNumber: generateCertificateNumber(),
        date: new Date().toISOString().split('T')[0]
      }));
    }
  }, [isOpen]);

  useEffect(() => {
    if (equipment) {
      console.log('Updating readings with equipment data:', equipment);
      
      setReadings(prev => ({
        ...prev,
        model: equipment.model || '',
        serialNumber: equipment.serial_number || '',
        min: equipment.min_torque?.toString() || '',
        max: equipment.max_torque?.toString() || '',
        units: equipment.units || 'nm',
      }));
    }
  }, [equipment]);

  return { readings, setReadings };
};