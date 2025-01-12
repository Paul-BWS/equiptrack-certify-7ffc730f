import { useState, useEffect } from "react";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";
import { Reading } from "@/types/tyreGauge";

export const useTyreGaugeForm = (equipmentId: string | null) => {
  const [isSaving, setIsSaving] = useState(false);
  const [certNumber, setCertNumber] = useState("");
  const [date, setDate] = useState<Date>();
  const [retestDate, setRetestDate] = useState<Date>();
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [engineer, setEngineer] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [units, setUnits] = useState("psi");
  const [status, setStatus] = useState("ACTIVE");
  const [notes, setNotes] = useState("");
  const [readings, setReadings] = useState<Reading[]>([
    { setting: "", reading: "", deviation: "" },
    { setting: "", reading: "", deviation: "" },
  ]);

  useEffect(() => {
    if (!equipmentId) {
      setCertNumber(generateCertificateNumber());
      setDate(new Date());
      // Set retest date to one year from now
      const nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      setRetestDate(nextYear);
    }
  }, [equipmentId]);

  return {
    isSaving,
    setIsSaving,
    certNumber,
    setCertNumber,
    date,
    setDate,
    retestDate,
    setRetestDate,
    model,
    setModel,
    serialNumber,
    setSerialNumber,
    engineer,
    setEngineer,
    min,
    setMin,
    max,
    setMax,
    units,
    setUnits,
    status,
    setStatus,
    notes,
    setNotes,
    readings,
    setReadings,
  };
};