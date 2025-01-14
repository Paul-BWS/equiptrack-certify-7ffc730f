import { useState, useEffect, useCallback } from "react";
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
  target1: string;
  actual1: string;
  deviation1: string;
  target2: string;
  actual2: string;
  deviation2: string;
  target3: string;
  actual3: string;
  deviation3: string;
  def_target1: string;
  def_actual1: string;
  def_deviation1: string;
  def_target2: string;
  def_actual2: string;
  def_deviation2: string;
  def_target3: string;
  def_actual3: string;
  def_deviation3: string;
}

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
  target1: "",
  actual1: "",
  deviation1: "",
  target2: "",
  actual2: "",
  deviation2: "",
  target3: "",
  actual3: "",
  deviation3: "",
  def_target1: "",
  def_actual1: "",
  def_deviation1: "",
  def_target2: "",
  def_actual2: "",
  def_deviation2: "",
  def_target3: "",
  def_actual3: "",
  def_deviation3: ""
};

export const useTorqueReadingsForm = (equipment: any, isOpen: boolean) => {
  const [readings, setReadings] = useState<TorqueReadingsForm>({ ...initialFormState });

  useEffect(() => {
    if (equipment && isOpen) {
      console.log('Equipment data received:', equipment);
      
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
        certNumber: equipment.cert_number || generateCertificateNumber(),
        status: equipment.status || 'ACTIVE',
        sentOn: equipment.sent_on || '',
        target1: equipment.target1 || '',
        actual1: equipment.actual1 || '',
        deviation1: equipment.deviation1 || '',
        target2: equipment.target2 || '',
        actual2: equipment.actual2 || '',
        deviation2: equipment.deviation2 || '',
        target3: equipment.target3 || '',
        actual3: equipment.actual3 || '',
        deviation3: equipment.deviation3 || '',
        def_target1: equipment.def_target1 || '',
        def_actual1: equipment.def_actual1 || '',
        def_deviation1: equipment.def_deviation1 || '',
        def_target2: equipment.def_target2 || '',
        def_actual2: equipment.def_actual2 || '',
        def_deviation2: equipment.def_deviation2 || '',
        def_target3: equipment.def_target3 || '',
        def_actual3: equipment.def_actual3 || '',
        def_deviation3: equipment.def_deviation3 || ''
      });
    } else if (isOpen) {
      setReadings({ ...initialFormState, certNumber: generateCertificateNumber() });
    }
  }, [equipment, isOpen]);

  const resetForm = useCallback(() => {
    setReadings({ ...initialFormState, certNumber: generateCertificateNumber() });
  }, []);

  return { readings, setReadings, resetForm };
};