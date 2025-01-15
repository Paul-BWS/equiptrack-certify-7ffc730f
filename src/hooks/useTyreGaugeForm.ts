import { useState, useEffect } from "react";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";
import { Reading } from "@/types/tyreGauge";
import { supabase } from "@/lib/supabase";
import { parseISO } from "date-fns";

export const useTyreGaugeForm = (equipmentId: string | null) => {
  const [isSaving, setIsSaving] = useState(false);
  const [certNumber, setCertNumber] = useState(() => generateCertificateNumber());
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

  useEffect(() => {
    const loadData = async () => {
      if (!equipmentId) {
        resetForm();
        return;
      }

      console.log("Loading tyre gauge data for ID:", equipmentId);
      
      const { data, error } = await supabase
        .from('tyre_gauges')
        .select('*')
        .eq('id', equipmentId)
        .single();

      if (error) {
        console.error('Error loading tyre gauge:', error);
        return;
      }

      console.log("Fetched tyre gauge data:", data);

      if (data) {
        // Keep existing cert number or generate new one if none exists
        setCertNumber(data.cert_number || generateCertificateNumber());
        
        // Parse dates properly using parseISO
        if (data.last_service_date) {
          console.log("Setting last service date:", data.last_service_date);
          const parsedDate = parseISO(data.last_service_date);
          console.log("Parsed date:", parsedDate);
          setDate(parsedDate);
        }
        
        if (data.next_service_due) {
          console.log("Setting next service due:", data.next_service_due);
          const parsedRetestDate = parseISO(data.next_service_due);
          console.log("Parsed retest date:", parsedRetestDate);
          setRetestDate(parsedRetestDate);
        }
        
        setModel(data.model || "");
        setSerialNumber(data.serial_number || "");
        setEngineer(data.engineer || "");
        setMin(data.min_pressure?.toString() || "");
        setMax(data.max_pressure?.toString() || "");
        setUnits(data.units || "psi");
        setStatus(data.status || "ACTIVE");
        setResult(data.result || "PASS");
        setNotes(data.notes || "");
        setReadings(data.readings || [
          { target: "", actual: "", deviation: "" },
          { target: "", actual: "", deviation: "" },
        ]);
        setDefinitiveReadings(data.definitive_readings || [
          { target: "", actual: "", deviation: "" },
          { target: "", actual: "", deviation: "" },
        ]);
      }
    };

    loadData();
  }, [equipmentId]);

  const resetForm = () => {
    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);
    
    setCertNumber(generateCertificateNumber());
    setDate(today);
    setRetestDate(nextYear);
    setModel("");
    setSerialNumber("");
    setEngineer("");
    setMin("");
    setMax("");
    setUnits("psi");
    setStatus("ACTIVE");
    setResult("PASS");
    setNotes("");
    setReadings([
      { target: "", actual: "", deviation: "" },
      { target: "", actual: "", deviation: "" },
    ]);
    setDefinitiveReadings([
      { target: "", actual: "", deviation: "" },
      { target: "", actual: "", deviation: "" },
    ]);
  };

  return {
    isSaving,
    setIsSaving,
    certNumber,
    date,
    retestDate,
    model,
    serialNumber,
    engineer,
    min,
    max,
    units,
    status,
    notes,
    readings,
    definitiveReadings,
    result,
    setDate,
    setRetestDate,
    setModel,
    setSerialNumber,
    setEngineer,
    setMin,
    setMax,
    setUnits,
    setStatus,
    setNotes,
    setReadings,
    setDefinitiveReadings,
    setResult,
    resetForm
  };
};
