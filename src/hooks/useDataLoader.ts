import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { parseISO, format } from "date-fns";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";

interface FormState {
  setCertNumber: (value: string) => void;
  setDate: (value: Date | undefined) => void;
  setRetestDate: (value: Date | undefined) => void;
  setModel: (value: string) => void;
  setSerialNumber: (value: string) => void;
  setEngineer: (value: string) => void;
  setMin: (value: string) => void;
  setMax: (value: string) => void;
  setUnits: (value: string) => void;
  setStatus: (value: string) => void;
  setNotes: (value: string) => void;
  setReadings: (value: any[]) => void;
  setDefinitiveReadings: (value: any[]) => void;
  setResult: (value: string) => void;
}

export const useDataLoader = (equipmentId: string | null, formState: FormState) => {
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
        formState.setCertNumber(data.cert_number || generateCertificateNumber());
        
        // Handle last_service_date
        if (data.last_service_date) {
          console.log("Raw last service date from DB:", data.last_service_date);
          try {
            const parsedDate = parseISO(data.last_service_date);
            console.log("Parsed last service date:", parsedDate);
            formState.setDate(parsedDate);
          } catch (error) {
            console.error("Error parsing last_service_date:", error);
          }
        }
        
        // Handle next_service_due
        if (data.next_service_due) {
          console.log("Raw next service date from DB:", data.next_service_due);
          try {
            const parsedDate = parseISO(data.next_service_due);
            console.log("Parsed next service date:", parsedDate);
            formState.setRetestDate(parsedDate);
          } catch (error) {
            console.error("Error parsing next_service_due:", error);
          }
        }
        
        formState.setModel(data.model || "");
        formState.setSerialNumber(data.serial_number || "");
        formState.setEngineer(data.engineer || "");
        formState.setMin(data.min_pressure?.toString() || "");
        formState.setMax(data.max_pressure?.toString() || "");
        formState.setUnits(data.units || "psi");
        formState.setStatus(data.status || "ACTIVE");
        formState.setResult(data.result || "PASS");
        formState.setNotes(data.notes || "");
        formState.setReadings(data.readings || [
          { target: "", actual: "", deviation: "" },
          { target: "", actual: "", deviation: "" },
        ]);
        formState.setDefinitiveReadings(data.definitive_readings || [
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
    
    formState.setCertNumber(generateCertificateNumber());
    formState.setDate(today);
    formState.setRetestDate(nextYear);
    formState.setModel("");
    formState.setSerialNumber("");
    formState.setEngineer("");
    formState.setMin("");
    formState.setMax("");
    formState.setUnits("psi");
    formState.setStatus("ACTIVE");
    formState.setResult("PASS");
    formState.setNotes("");
    formState.setReadings([
      { target: "", actual: "", deviation: "" },
      { target: "", actual: "", deviation: "" },
    ]);
    formState.setDefinitiveReadings([
      { target: "", actual: "", deviation: "" },
      { target: "", actual: "", deviation: "" },
    ]);
  };

  return { resetForm };
};