import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";
import { HeaderSection } from "./tyre-gauge-readings/HeaderSection";
import { BasicDetails } from "./tyre-gauge-readings/BasicDetails";
import { MeasurementsSection } from "./tyre-gauge-readings/MeasurementsSection";
import { ReadingsSection } from "./tyre-gauge-readings/ReadingsSection";

interface TyreGaugeReadingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}

interface Reading {
  setting: string;
  reading: string;
  deviation: string;
}

export const TyreGaugeReadingsModal = ({
  open,
  onOpenChange,
  equipmentId,
}: TyreGaugeReadingsModalProps) => {
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

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm text-[#C8C8C9]">Notes</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full min-h-[100px] p-2 border rounded-md border-gray-200 bg-white placeholder:text-[#C8C8C9]"
              placeholder="Add any additional notes here..."
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-white hover:bg-gray-50 border-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};