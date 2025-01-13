import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { HeaderSection } from "./tyre-gauge-readings/HeaderSection";
import { BasicDetails } from "./tyre-gauge-readings/BasicDetails";
import { MeasurementsSection } from "./tyre-gauge-readings/MeasurementsSection";
import { ReadingsSection } from "./tyre-gauge-readings/ReadingsSection";
import { NotesSection } from "./tyre-gauge-readings/NotesSection";
import { FormActions } from "./tyre-gauge-readings/FormActions";
import { useTyreGaugeForm } from "@/hooks/useTyreGaugeForm";
import { useParams, useNavigate } from "react-router-dom";

interface TyreGaugeReadingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}

export const TyreGaugeReadingsModal = ({
  open,
  onOpenChange,
  equipmentId,
}: TyreGaugeReadingsModalProps) => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const {
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
  } = useTyreGaugeForm(equipmentId);

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('tyre_gauges')
        .delete()
        .eq('id', equipmentId);

      if (error) throw error;
      
      toast.success("Tyre gauge deleted successfully");
      onOpenChange(false);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting tyre gauge:', error);
      toast.error("Failed to delete tyre gauge");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const formattedReadings = Array.isArray(readings) ? readings : [];
      const formattedDefinitiveReadings = Array.isArray(definitiveReadings) ? definitiveReadings : [];

      console.log('Submitting definitive readings:', formattedDefinitiveReadings);

      const tyreGaugeData = {
        cert_number: certNumber,
        last_service_date: date?.toISOString(),
        next_service_due: retestDate?.toISOString(),
        model: model,
        serial_number: serialNumber,
        engineer: engineer,
        min_pressure: min,
        max_pressure: max,
        units: units,
        status: status,
        notes: notes,
        readings: formattedReadings,
        definitive_readings: formattedDefinitiveReadings,
        result: result,
      };

      if (equipmentId) {
        const { error } = await supabase
          .from('tyre_gauges')
          .update(tyreGaugeData)
          .eq('id', equipmentId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('tyre_gauges')
          .insert([{
            ...tyreGaugeData,
            company_id: customerId,
          }]);

        if (error) throw error;
      }
      
      toast.success(equipmentId ? "Tyre gauge updated successfully" : "New tyre gauge created successfully");
      onOpenChange(false);
      window.location.reload();
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error(equipmentId ? "Failed to update tyre gauge" : "Failed to create new tyre gauge");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-xl font-semibold">
            {equipmentId ? 'Edit Tyre Gauge' : 'New Tyre Gauge'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <HeaderSection
            certNumber={certNumber}
            date={date?.toISOString() || ''}
            retestDate={retestDate?.toISOString() || ''}
            status={status}
            onDateChange={(dateStr) => setDate(new Date(dateStr))}
            onRetestDateChange={(dateStr) => setRetestDate(new Date(dateStr))}
            onStatusChange={setStatus}
          />
          
          <BasicDetails
            model={model}
            serialNumber={serialNumber}
            engineer={engineer}
            result={result}
            onModelChange={setModel}
            onSerialNumberChange={setSerialNumber}
            onEngineerChange={setEngineer}
            onResultChange={setResult}
          />
          
          <MeasurementsSection
            min={min}
            max={max}
            units={units}
            onMinChange={setMin}
            onMaxChange={setMax}
            onUnitsChange={setUnits}
          />

          <ReadingsSection
            readings={readings}
            definitiveReadings={definitiveReadings}
            onReadingsChange={setReadings}
            onDefinitiveReadingsChange={setDefinitiveReadings}
          />

          <NotesSection
            notes={notes}
            onChange={setNotes}
          />

          <FormActions
            onCancel={() => onOpenChange(false)}
            onDelete={handleDelete}
            showDelete={!!equipmentId}
            isSaving={isSaving}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};