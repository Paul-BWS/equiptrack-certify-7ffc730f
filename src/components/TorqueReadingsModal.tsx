import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormField } from "./torque-readings/FormField";
import { ReadingsSection } from "./torque-readings/ReadingsSection";

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
  });

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
          <div className="grid grid-cols-4 gap-4">
            <FormField
              id="certNumber"
              label="Certificate Number"
              value={readings.certNumber}
              onChange={(e) => setReadings({ ...readings, certNumber: e.target.value })}
              placeholder="BWS13009"
            />
            <FormField
              id="date"
              label="Test Date"
              type="date"
              value={readings.date}
              onChange={(e) => setReadings({ ...readings, date: e.target.value })}
              showCalendar
            />
            <FormField
              id="retestDate"
              label="Retest Date"
              type="date"
              value={readings.retestDate}
              onChange={(e) => setReadings({ ...readings, retestDate: e.target.value })}
              showCalendar
            />
            <FormField
              id="status"
              label="Status"
              value={readings.status}
              readOnly
              className="text-green-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="model"
              label="Model"
              value={readings.model}
              onChange={(e) => setReadings({ ...readings, model: e.target.value })}
              placeholder="Silver (red handle)"
            />
            <FormField
              id="serialNumber"
              label="Serial Number"
              value={readings.serialNumber}
              onChange={(e) => setReadings({ ...readings, serialNumber: e.target.value })}
              placeholder="TW01"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="engineer"
              label="Engineer"
              value={readings.engineer}
              onChange={(e) => setReadings({ ...readings, engineer: e.target.value })}
              placeholder="Engineer name"
            />
            <FormField
              id="sentOn"
              label="Sent On"
              value={readings.sentOn}
              readOnly
              className="bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <FormField
              id="min"
              label="MIN"
              type="number"
              value={readings.min}
              onChange={(e) => setReadings({ ...readings, min: e.target.value })}
              placeholder="40"
            />
            <FormField
              id="max"
              label="MAX"
              type="number"
              value={readings.max}
              onChange={(e) => setReadings({ ...readings, max: e.target.value })}
              placeholder="340"
            />
            <FormField
              id="units"
              label="UNITS"
              value={readings.units}
              onChange={(e) => setReadings({ ...readings, units: e.target.value })}
            />
            <FormField
              id="result"
              label="RESULT"
              value={readings.result}
              readOnly
              className="text-green-500 font-medium"
            />
          </div>

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