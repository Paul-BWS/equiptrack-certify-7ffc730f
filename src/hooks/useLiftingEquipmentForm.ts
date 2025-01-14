import { useState, useEffect } from "react";

interface LiftingEquipment {
  model: string;
  serial_number: string;
  last_service_date: string;
  next_service_due: string;
  engineer: string;
  result: string;
  notes: string;
  cert_number: string;
  status: string;
}

interface LiftingEquipmentReadings {
  date: string;
  retestDate: string;
  certNumber: string;
  model: string;
  serialNumber: string;
  engineer: string;
  result: string;
  notes: string;
  status: string;
}

export const useLiftingEquipmentForm = (
  equipment: LiftingEquipment | null,
  isOpen: boolean
) => {
  const [readings, setReadings] = useState<LiftingEquipmentReadings>({
    date: "",
    retestDate: "",
    certNumber: "",
    model: "",
    serialNumber: "",
    engineer: "",
    result: "",
    notes: "",
    status: "ACTIVE"
  });

  useEffect(() => {
    if (equipment && isOpen) {
      setReadings({
        date: equipment.last_service_date || "",
        retestDate: equipment.next_service_due || "",
        certNumber: equipment.cert_number || "",
        model: equipment.model || "",
        serialNumber: equipment.serial_number || "",
        engineer: equipment.engineer || "",
        result: equipment.result || "",
        notes: equipment.notes || "",
        status: equipment.status || "ACTIVE"
      });
    } else if (!isOpen) {
      setReadings({
        date: "",
        retestDate: "",
        certNumber: "",
        model: "",
        serialNumber: "",
        engineer: "",
        result: "",
        notes: "",
        status: "ACTIVE"
      });
    }
  }, [equipment, isOpen]);

  return { readings, setReadings };
};