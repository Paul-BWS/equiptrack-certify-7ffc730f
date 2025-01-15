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
import { useEffect } from "react";
import { format } from "date-fns";

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
    handleSubmit,
    resetForm
  } = useTyreGaugeForm(equipmentId);

  // Reset form when modal opens for new entry
  useEffect(() => {
    if (open && !equipmentId) {
      resetForm();
    }
  }, [open, equipmentId, resetForm]);

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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(
      {
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
      },
      setIsSaving
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-xl font-semibold">
            {equipmentId ? 'Edit Tyre Gauge' : 'New Tyre Gauge'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="p-6 space-y-6">
          <HeaderSection
            certNumber={certNumber}
            date={date ? format(date, 'yyyy-MM-dd') : ''}
            retestDate={retestDate ? format(retestDate, 'yyyy-MM-dd') : ''}
            status={status}
            onDateChange={(dateStr) => setDate(dateStr ? new Date(dateStr) : undefined)}
            onRetestDateChange={(dateStr) => setRetestDate(dateStr ? new Date(dateStr) : undefined)}
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