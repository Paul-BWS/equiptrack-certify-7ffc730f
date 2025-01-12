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
  } = useTyreGaugeForm(equipmentId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('tyre_gauges')
        .update({
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
          readings: readings,
        })
        .eq('id', equipmentId);

      if (error) throw error;
      
      toast.success("Tyre gauge data saved successfully");
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error("Failed to save tyre gauge data");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-xl font-semibold">
            Tyre Gauge Readings
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <HeaderSection
            certNumber={certNumber}
            date={date}
            retestDate={retestDate}
            status={status}
            onDateChange={setDate}
            onRetestDateChange={setRetestDate}
            onStatusChange={setStatus}
          />
          
          <BasicDetails
            model={model}
            serialNumber={serialNumber}
            engineer={engineer}
            onModelChange={setModel}
            onSerialNumberChange={setSerialNumber}
            onEngineerChange={setEngineer}
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
            onReadingsChange={setReadings}
          />

          <NotesSection
            notes={notes}
            onChange={setNotes}
          />

          <FormActions
            onCancel={() => onOpenChange(false)}
            isSaving={isSaving}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};