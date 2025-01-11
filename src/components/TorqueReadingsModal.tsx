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

  const [showCertificate, setShowCertificate] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (open) {
      setReadings(prev => ({
        ...prev,
        certNumber: generateCertificateNumber()
      }));
    }
  }, [open]);

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
              <div className="flex justify-end">
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