import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormField } from "./torque-readings/FormField";
import { ReadingsSection } from "./torque-readings/ReadingsSection";
import { HeaderSection } from "./torque-readings/HeaderSection";
import { EquipmentSection } from "./torque-readings/EquipmentSection";
import { MeasurementsSection } from "./torque-readings/MeasurementsSection";
import { CertificateModal } from "./CertificateModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { validateForm } from "@/utils/torqueReadingsValidation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import {
  generateCertificateNumber,
  calculateDeviation,
  prepareCertificateData,
  prepareEquipmentData,
  prepareServiceRecordData
} from "@/utils/certificateDataPreparation";

interface TorqueReadingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}

export const TorqueReadingsModal = ({
  open,
  onOpenChange,
  equipmentId,
}: TorqueReadingsModalProps) => {
  const [readings, setReadings] = useState({
    certNumber: "",
    date: "",
    retestDate: "",
    model: "",
    serialNumber: "",
    engineer: "",
    min: "",
    max: "",
    units: "nm",
    status: "ACTIVE",
    sentOn: "",
    result: "PASS",
    notes: "",
    readings: [
      { target: "", actual: "", deviation: "" },
      { target: "", actual: "", deviation: "" },
      { target: "", actual: "", deviation: "" },
    ],
    definitiveReadings: [
      { target: "", actual: "", deviation: "" },
      { target: "", actual: "", deviation: "" },
      { target: "", actual: "", deviation: "" },
    ],
  });

  const { data: equipmentData } = useQuery({
    queryKey: ['equipment', equipmentId],
    queryFn: async () => {
      if (!equipmentId) return null;
      
      // Fetch both equipment and its latest service record
      const [equipmentResult, serviceResult] = await Promise.all([
        supabase
          .from('equipment')
          .select('*')
          .eq('id', equipmentId)
          .single(),
        supabase
          .from('service_records')
          .select('*')
          .eq('equipment_id', equipmentId)
          .order('service_date', { ascending: false })
          .limit(1)
          .maybeSingle() // Changed from single() to maybeSingle()
      ]);

      if (equipmentResult.error) {
        console.error('Error fetching equipment:', equipmentResult.error);
        toast.error("Failed to load equipment data");
        throw equipmentResult.error;
      }

      // Return combined data
      return {
        ...equipmentResult.data,
        lastService: serviceResult.data // This will be null if no service records exist
      };
    },
    enabled: !!equipmentId && open,
  });

  const [showCertificate, setShowCertificate] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (open) {
      setReadings(prev => ({
        ...prev,
        certNumber: generateCertificateNumber()
      }));
    }
  }, [open]);

  useEffect(() => {
    if (equipmentData) {
      setReadings(prev => ({
        ...prev,
        model: equipmentData.model || '',
        serialNumber: equipmentData.serial_number || '',
        date: new Date().toISOString().split('T')[0], // Today's date
        min: equipmentData.min_torque?.toString() || '',
        max: equipmentData.max_torque?.toString() || '',
        units: equipmentData.units || 'nm',
        // If there's last service data, use its readings
        ...(equipmentData.lastService && {
          readings: equipmentData.lastService.readings || prev.readings,
          definitiveReadings: equipmentData.lastService.definitive_readings || prev.definitiveReadings,
          notes: equipmentData.lastService.notes || '',
        })
      }));
    }
  }, [equipmentData]);

  const handleSave = async () => {
    if (!validateForm(readings)) {
      return;
    }

    setIsSaving(true);
    try {
      const equipment = prepareEquipmentData(readings, equipmentId);
      const serviceRecord = prepareServiceRecordData(readings, equipmentId);
      const certificate = prepareCertificateData(readings, equipmentId);

      // Save equipment data
      const { error: equipmentError } = await supabase
        .from('equipment')
        .upsert([equipment]);

      if (equipmentError) throw equipmentError;

      // Save service record
      const { error: serviceError } = await supabase
        .from('service_records')
        .insert([serviceRecord]);

      if (serviceError) throw serviceError;

      // Save certificate
      const { error: certError } = await supabase
        .from('certificates')
        .insert([certificate]);

      if (certError) throw certError;

      toast.success("Torque wrench data saved successfully");
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error("Failed to save torque wrench data");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(readings)) {
      return;
    }

    console.log("Form submitted:", readings);
    setShowCertificate(true);
  };

  const handleReadingChange = (index: number, field: string, value: string) => {
    const newReadings = [...readings.readings];
    newReadings[index] = { ...newReadings[index], [field]: value };

    if (field === 'target' || field === 'actual') {
      const target = field === 'target' ? value : newReadings[index].target;
      const actual = field === 'actual' ? value : newReadings[index].actual;
      newReadings[index].deviation = calculateDeviation(target, actual);
    }

    const newDefinitiveReadings = [...newReadings];

    setReadings({ 
      ...readings, 
      readings: newReadings,
      definitiveReadings: newDefinitiveReadings
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-[#FFFFFF]">
          <DialogHeader>
            <DialogTitle>Torque Wrench Readings</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <HeaderSection
              date={readings.date}
              retestDate={readings.retestDate}
              certNumber={readings.certNumber}
              status={readings.status}
              onDateChange={(value) => setReadings({ ...readings, date: value })}
              onRetestDateChange={(value) => setReadings({ ...readings, retestDate: value })}
            />

            <EquipmentSection
              model={readings.model}
              serialNumber={readings.serialNumber}
              engineer={readings.engineer}
              sentOn={readings.sentOn}
              onModelChange={(value) => setReadings({ ...readings, model: value })}
              onSerialNumberChange={(value) => setReadings({ ...readings, serialNumber: value })}
              onEngineerChange={(value) => setReadings({ ...readings, engineer: value })}
            />

            <MeasurementsSection
              min={readings.min}
              max={readings.max}
              units={readings.units}
              result={readings.result}
              onMinChange={(value) => setReadings({ ...readings, min: value })}
              onMaxChange={(value) => setReadings({ ...readings, max: value })}
              onUnitsChange={(value) => setReadings({ ...readings, units: value })}
              onResultChange={(value) => setReadings({ ...readings, result: value })}
            />

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-8">
                <ReadingsSection
                  title="AS FOUND"
                  readings={readings.readings}
                  onChange={handleReadingChange}
                />
                <ReadingsSection
                  title="DEFINITIVE"
                  readings={readings.definitiveReadings}
                  readOnly
                />
              </div>
            </div>

            <FormField
              id="notes"
              label="Notes"
              value={readings.notes}
              onChange={(e) => setReadings({ ...readings, notes: e.target.value })}
            />

            {!isMobile && (
              <div className="flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save"}
                </Button>
                <Button type="submit">Generate Certificate</Button>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>

      <CertificateModal
        open={showCertificate}
        onOpenChange={setShowCertificate}
        certificate={prepareCertificateData(readings, equipmentId)}
        equipment={prepareEquipmentData(readings, equipmentId)}
        serviceRecord={prepareServiceRecordData(readings, equipmentId)}
      />
    </>
  );
};
