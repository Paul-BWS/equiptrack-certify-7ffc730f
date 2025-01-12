import { useState, useEffect } from "react";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";
import { Reading } from "@/types/tyreGauge";
import { supabase } from "@/lib/supabase";

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
    { target: "", actual: "", deviation: "" },
    { target: "", actual: "", deviation: "" },
  ]);

  useEffect(() => {
    const loadData = async () => {
      if (!equipmentId) {
        // Initialize form for new tyre gauge
        setCertNumber(generateCertificateNumber());
        setDate(new Date());
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        setRetestDate(nextYear);
        setModel("");
        setSerialNumber("");
        setEngineer("");
        setMin("");
        setMax("");
        setUnits("psi");
        setStatus("ACTIVE");
        setNotes("");
        setReadings([
          { target: "", actual: "", deviation: "" },
          { target: "", actual: "", deviation: "" },
        ]);
        return;
      }

      // Load existing tyre gauge data
      const { data, error } = await supabase
        .from('tyre_gauges')
        .select('*')
        .eq('id', equipmentId)
        .single();

      if (error) {
        console.error('Error loading tyre gauge:', error);
        return;
      }

      if (data) {
        setCertNumber(data.cert_number || generateCertificateNumber());
        setDate(data.last_service_date ? new Date(data.last_service_date) : new Date());
        setRetestDate(data.next_service_due ? new Date(data.next_service_due) : new Date());
        setModel(data.model || "");
        setSerialNumber(data.serial_number || "");
        setEngineer(data.engineer || "");
        setMin(data.min_pressure?.toString() || "");
        setMax(data.max_pressure?.toString() || "");
        setUnits(data.units || "psi");
        setStatus(data.status || "ACTIVE");
        setNotes(data.notes || "");
        setReadings(data.readings || [
          { target: "", actual: "", deviation: "" },
          { target: "", actual: "", deviation: "" },
        ]);
      }
    };

    loadData();
  }, [equipmentId]);

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
  };
};