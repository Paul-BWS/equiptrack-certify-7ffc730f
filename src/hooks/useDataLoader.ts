import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { parseISO } from "date-fns";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";
import { FormState } from "@/types/tyreGauge";

export const useDataLoader = (equipmentId: string | null, formState: FormState) => {
  useEffect(() => {
    const loadData = async () => {
      if (!equipmentId) {
        resetForm();
        return;
      }

      try {
        const { data, error } = await supabase
          .from('tyre_gauges')
          .select('*')
          .eq('id', equipmentId)
          .single();

        if (error) {
          throw error;
        }

        console.log("Fetched tyre gauge data:", data);

        if (data) {
          // Only set cert number if the setter exists and we have data
          if (formState.setCertNumber && data.cert_number) {
            formState.setCertNumber(data.cert_number);
          }
          
          // Handle last_service_date
          if (data.last_service_date) {
            formState.setDate(parseISO(data.last_service_date));
          }

          // Handle next_service_due
          if (data.next_service_due) {
            formState.setRetestDate(parseISO(data.next_service_due));
          }

          formState.setModel(data.model || "");
          formState.setSerialNumber(data.serial_number || "");
          formState.setEngineer(data.engineer || "");
          formState.setMin(data.min_pressure?.toString() || "");
          formState.setMax(data.max_pressure?.toString() || "");
          formState.setUnits(data.units || "psi");
          formState.setStatus(data.status || "ACTIVE");
          formState.setNotes(data.notes || "");
          
          // Handle readings
          if (data.readings) {
            formState.setReadings(Array.isArray(data.readings) ? data.readings : []);
          }
          
          // Handle definitive readings
          if (data.definitive_readings) {
            formState.setDefinitiveReadings(Array.isArray(data.definitive_readings) ? data.definitive_readings : []);
          }
          
          formState.setResult(data.result || "PASS");
        }
      } catch (error) {
        console.error('Error loading tyre gauge:', error);
      }
    };

    loadData();
  }, [equipmentId]);

  const resetForm = () => {
    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);
    
    // Only reset cert number if the setter exists
    if (formState.setCertNumber) {
      formState.setCertNumber(generateCertificateNumber());
    }
    
    formState.setDate(today);
    formState.setRetestDate(nextYear);
    formState.setModel("");
    formState.setSerialNumber("");
    formState.setEngineer("");
    formState.setMin("");
    formState.setMax("");
    formState.setUnits("psi");
    formState.setStatus("ACTIVE");
    formState.setNotes("");
    formState.setReadings([
      { target: "", actual: "", deviation: "" },
      { target: "", actual: "", deviation: "" }
    ]);
    formState.setDefinitiveReadings([
      { target: "", actual: "", deviation: "" },
      { target: "", actual: "", deviation: "" }
    ]);
    formState.setResult("PASS");
  };

  return { resetForm };
};