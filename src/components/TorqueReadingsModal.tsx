import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-[#FFFFFF]">
        <DialogHeader>
          <DialogTitle>Torque Wrench Readings</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="certNumber" className="text-[#C8C8C9] text-sm">Certificate Number</Label>
              <Input
                id="certNumber"
                value={readings.certNumber}
                onChange={(e) => setReadings({ ...readings, certNumber: e.target.value })}
                placeholder="BWS13009"
                className="text-sm bg-[#F9F9F9]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-[#C8C8C9] text-sm">Test Date</Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  value={readings.date}
                  onChange={(e) => setReadings({ ...readings, date: e.target.value })}
                  className="text-sm bg-[#F9F9F9]"
                />
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="retestDate" className="text-[#C8C8C9] text-sm">Retest Date</Label>
              <div className="relative">
                <Input
                  id="retestDate"
                  type="date"
                  value={readings.retestDate}
                  onChange={(e) => setReadings({ ...readings, retestDate: e.target.value })}
                  className="text-sm bg-[#F9F9F9]"
                />
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-[#C8C8C9] text-sm">Status</Label>
              <Input
                id="status"
                value={readings.status}
                readOnly
                className="text-sm bg-[#F9F9F9] text-green-500 font-medium"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="model" className="text-[#C8C8C9] text-sm">Model</Label>
              <Input
                id="model"
                value={readings.model}
                onChange={(e) => setReadings({ ...readings, model: e.target.value })}
                placeholder="Silver (red handle)"
                className="text-sm bg-[#F9F9F9]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serialNumber" className="text-[#C8C8C9] text-sm">Serial Number</Label>
              <Input
                id="serialNumber"
                value={readings.serialNumber}
                onChange={(e) => setReadings({ ...readings, serialNumber: e.target.value })}
                placeholder="TW01"
                className="text-sm bg-[#F9F9F9]"
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="engineer" className="text-[#C8C8C9] text-sm">Engineer</Label>
              <Input
                id="engineer"
                value={readings.engineer}
                onChange={(e) => setReadings({ ...readings, engineer: e.target.value })}
                placeholder="Engineer name"
                className="text-sm bg-[#F9F9F9]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sentOn" className="text-[#C8C8C9] text-sm">Sent On</Label>
              <Input
                id="sentOn"
                value={readings.sentOn}
                readOnly
                className="text-sm bg-[#F9F9F9] bg-gray-100"
              />
            </div>
          </div>

          {/* Fourth Row */}
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min" className="text-[#C8C8C9] text-sm">MIN</Label>
              <Input
                id="min"
                type="number"
                value={readings.min}
                onChange={(e) => setReadings({ ...readings, min: e.target.value })}
                placeholder="40"
                className="text-sm bg-[#F9F9F9]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max" className="text-[#C8C8C9] text-sm">MAX</Label>
              <Input
                id="max"
                type="number"
                value={readings.max}
                onChange={(e) => setReadings({ ...readings, max: e.target.value })}
                placeholder="340"
                className="text-sm bg-[#F9F9F9]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="units" className="text-[#C8C8C9] text-sm">UNITS</Label>
              <Input
                id="units"
                value={readings.units}
                onChange={(e) => setReadings({ ...readings, units: e.target.value })}
                className="text-sm bg-[#F9F9F9]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="result" className="text-[#C8C8C9] text-sm">RESULT</Label>
              <Input
                id="result"
                value={readings.result}
                readOnly
                className="text-sm bg-[#F9F9F9] text-green-500 font-medium"
              />
            </div>
          </div>

          {/* Test Readings */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">AS FOUND</h3>
                {readings.readings.map((reading, index) => (
                  <div key={`as-found-${index}`} className="grid grid-cols-3 gap-2 mb-2">
                    <Input
                      value={reading.target}
                      onChange={(e) => {
                        const newReadings = [...readings.readings];
                        newReadings[index].target = e.target.value;
                        setReadings({ ...readings, readings: newReadings });
                      }}
                      placeholder="Target"
                      className="text-sm bg-[#F9F9F9]"
                    />
                    <Input
                      value={reading.actual}
                      onChange={(e) => {
                        const newReadings = [...readings.readings];
                        newReadings[index].actual = e.target.value;
                        setReadings({ ...readings, readings: newReadings });
                      }}
                      placeholder="Actual"
                      className="text-sm bg-[#F9F9F9]"
                    />
                    <Input
                      value={reading.deviation}
                      onChange={(e) => {
                        const newReadings = [...readings.readings];
                        newReadings[index].deviation = e.target.value;
                        setReadings({ ...readings, readings: newReadings });
                      }}
                      placeholder="Deviation"
                      className="text-sm bg-[#F9F9F9]"
                    />
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold mb-4">DEFINITIVE</h3>
                {readings.readings.map((reading, index) => (
                  <div key={`definitive-${index}`} className="grid grid-cols-3 gap-2 mb-2">
                    <Input
                      value={reading.target}
                      readOnly
                      className="text-sm bg-[#F9F9F9]"
                    />
                    <Input
                      value={reading.actual}
                      readOnly
                      className="text-sm bg-[#F9F9F9]"
                    />
                    <Input
                      value={reading.deviation}
                      readOnly
                      className="text-sm bg-[#F9F9F9]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-[#C8C8C9] text-sm">NOTES</Label>
            <Input
              id="notes"
              value={readings.notes}
              onChange={(e) => setReadings({ ...readings, notes: e.target.value })}
              className="text-sm bg-[#F9F9F9]"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Generate Certificate</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};