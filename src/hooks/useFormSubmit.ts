import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { format } from "date-fns";
import { Reading } from "@/types/tyreGauge";

interface FormData {
  certNumber: string;
  date?: Date;
  retestDate?: Date;
  model: string;
  serialNumber: string;
  engineer: string;
  min: string;
  max: string;
  units: string;
  status: string;
  notes: string;
  readings: Reading[];
  definitiveReadings: Reading[];
  result: string;
}

export const useFormSubmit = (equipmentId: string | null, onSuccess: () => void) => {
  const handleSubmit = async (formData: FormData, setIsSaving: (value: boolean) => void) => {
    setIsSaving(true);
    
    try {
      const formattedReadings = Array.isArray(formData.readings) ? formData.readings : [];
      const formattedDefinitiveReadings = Array.isArray(formData.definitiveReadings) ? formData.definitiveReadings : [];

      const tyreGaugeData = {
        cert_number: formData.certNumber,
        last_service_date: formData.date ? format(formData.date, 'yyyy-MM-dd') : null,
        next_service_due: formData.retestDate ? format(formData.retestDate, 'yyyy-MM-dd') : null,
        model: formData.model,
        serial_number: formData.serialNumber,
        engineer: formData.engineer,
        min_pressure: formData.min,
        max_pressure: formData.max,
        units: formData.units,
        status: formData.status,
        notes: formData.notes,
        readings: formattedReadings,
        definitive_readings: formattedDefinitiveReadings,
        result: formData.result,
      };

      if (equipmentId) {
        const { error } = await supabase
          .from('tyre_gauges')
          .update(tyreGaugeData)
          .eq('id', equipmentId);

        if (error) throw error;
        toast.success("Tyre gauge updated successfully");
      } else {
        const pathSegments = window.location.pathname.split('/');
        const companyIdIndex = pathSegments.indexOf('customers') + 1;
        const companyId = pathSegments[companyIdIndex];

        const { error } = await supabase
          .from('tyre_gauges')
          .insert([{
            ...tyreGaugeData,
            company_id: companyId,
          }]);

        if (error) throw error;
        toast.success("New tyre gauge created successfully");
      }
      
      onSuccess();
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error(equipmentId ? "Failed to update tyre gauge" : "Failed to create new tyre gauge");
    } finally {
      setIsSaving(false);
    }
  };

  return { handleSubmit };
};