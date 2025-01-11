import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormField } from "./torque-readings/FormField";
import { ReadingsSection } from "./torque-readings/ReadingsSection";
import { HeaderSection } from "./torque-readings/HeaderSection";
import { EquipmentSection } from "./torque-readings/EquipmentSection";
import { MeasurementsSection } from "./torque-readings/MeasurementsSection";

interface TorqueReadingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}

const generateCertificateNumber = () => {
  const prefix = 'BWS';
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}${randomNum}`;
};

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
  });

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
    console.log("Form submitted:", readings);
    onOpenChange(false);
  };

  const handleReadingChange = (index: number, field: string, value: string) => {
    const newReadings = [...readings.readings];
    newReadings[index] = { ...newReadings[index], [field]: value };
    setReadings({ ...readings, readings: newReadings });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-[#FFFFFF]">
        <DialogHeader>
          <DialogTitle>Torque Wrench Readings</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <HeaderSection
            date={readings.date}
            status={readings.status}
            retestDate={readings.retestDate}
            certNumber={readings.certNumber}
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
                readings={readings.readings}
                readOnly
              />
            </div>
          </div>

          <FormField
            id="notes"
            label="NOTES"
            value={readings.notes}
            onChange={(e) => setReadings({ ...readings, notes: e.target.value })}
          />

          <div className="flex justify-end">
            <Button type="submit">Generate Certificate</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};