import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HeaderSection } from "./torque-readings/HeaderSection";
import { EquipmentSection } from "./torque-readings/EquipmentSection";
import { MeasurementsSection } from "./torque-readings/MeasurementsSection";
import { ReadingsSection } from "./torque-readings/ReadingsSection";
import { FormField } from "./torque-readings/FormField";
import { CertificateModal } from "./CertificateModal";
import { LoadingState } from "./torque-readings/LoadingState";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import { useTorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";
import { validateForm } from "@/utils/torqueReadingsValidation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { prepareCertificateData } from "@/utils/certificateDataPreparation";
import { TorqueWrench } from "@/types/equipment";

const calculateDeviation = (target: string, actual: string): string => {
  if (!target || !actual) return "";
  const targetNum = parseFloat(target);
  const actualNum = parseFloat(actual);
  if (isNaN(targetNum) || isNaN(actualNum) || targetNum === 0) return "";
  const deviation = ((actualNum - targetNum) / targetNum) * 100;
  return deviation.toFixed(2);
};

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
  const { data: equipment, isLoading } = useEquipmentData(equipmentId, open);
  const { readings, setReadings } = useTorqueReadingsForm(equipment, open);
  const [showCertificate, setShowCertificate] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isMobile = useIsMobile();

  if (isLoading) {
    return <LoadingState open={open} onOpenChange={onOpenChange} />;
  }

  const handleSave = async () => {
    if (!validateForm(readings)) {
      return;
    }

    setIsSaving(true);
    try {
      const pathSegments = window.location.pathname.split('/');
      const companyIdIndex = pathSegments.indexOf('customers') + 1;
      const companyId = pathSegments[companyIdIndex];

      const torqueWrenchData: TorqueWrench = {
        id: equipmentId || undefined,
        company_id: companyId,
        model: readings.model,
        serial_number: readings.serialNumber,
        min_torque: parseFloat(readings.min),
        max_torque: parseFloat(readings.max),
        units: readings.units,
        last_service_date: readings.date,
        next_service_due: readings.retestDate,
        engineer: readings.engineer,
        result: readings.result,
        notes: readings.notes,
        readings: readings.readings,
        definitive_readings: readings.definitiveReadings,
        cert_number: readings.certNumber,
        status: readings.status
      };

      const { error: torqueWrenchError } = await supabase
        .from('torque_wrench')
        .upsert([torqueWrenchData]);

      if (torqueWrenchError) throw torqueWrenchError;

      const certificate = prepareCertificateData(readings, equipmentId);
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
        equipment={readings}
        serviceRecord={null}
      />
    </>
  );
};