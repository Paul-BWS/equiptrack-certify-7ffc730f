import { useState } from "react";
import { Reading } from "@/types/tyreGauge";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";

export const useFormState = (equipmentId: string | null) => {
  const [isSaving, setIsSaving] = useState(false);
  // Generate certificate number only once during initialization
  const [certNumber] = useState(() => generateCertificateNumber());
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
    { target: "", actual: "", deviation: "" },
    { target: "", actual: "", deviation: "" },
  ]);
  const [definitiveReadings, setDefinitiveReadings] = useState<Reading[]>([
    { target: "", actual: "", deviation: "" },
    { target: "", actual: "", deviation: "" },
  ]);
  const [result, setResult] = useState("PASS");

  // Add setCertNumber as a no-op function to satisfy the type
  const setCertNumber = () => {};

  return {
    isSaving,
    setIsSaving,
    certNumber,
    setCertNumber, // Include it in the return object
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
    definitiveReadings,
    setDefinitiveReadings,
    result,
    setResult,
  };
};