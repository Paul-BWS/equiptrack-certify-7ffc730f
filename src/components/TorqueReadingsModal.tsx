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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-[#FFFFFF]">
        <DialogHeader>
          <DialogTitle>Torque Wrench Readings</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="certNumber" className="text-[#B3B3B3] text-xs">Certificate Number</Label>
              <Input
                id="certNumber"
                value={readings.certNumber}
                onChange={(e) => setReadings({ ...readings, certNumber: e.target.value })}
                placeholder="BWS13009"
                className="text-sm bg-[#F9F9F9]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-[#B3B3B3] text-xs">Test Date</Label>
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
              <Label htmlFor="model" className="text-[#B3B3B3] text-xs">Model</Label>
              <Input
                id="model"
                value={readings.model}
                onChange={(e) => setReadings({ ...readings, model: e.target.value })}
                placeholder="Silver (red handle)"
                className="text-sm bg-[#F9F9F9]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serialNumber" className="text-[#B3B3B3] text-xs">Serial Number</Label>
              <Input
                id="serialNumber"
                value={readings.serialNumber}
                onChange={(e) => setReadings({ ...readings, serialNumber: e.target.value })}
                placeholder="TW01"
                className="text-sm bg-[#F9F9F9]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="engineer" className="text-[#B3B3B3] text-xs">Engineer</Label>
              <Input
                id="engineer"
                value={readings.engineer}
                onChange={(e) => setReadings({ ...readings, engineer: e.target.value })}
                placeholder="Engineer name"
                className="text-sm bg-[#F9F9F9]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="retestDate" className="text-[#B3B3B3] text-xs">Retest Date</Label>
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
              <Label htmlFor="min" className="text-[#B3B3B3] text-xs">Minimum Value</Label>
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
              <Label htmlFor="max" className="text-[#B3B3B3] text-xs">Maximum Value</Label>
              <Input
                id="max"
                type="number"
                value={readings.max}
                onChange={(e) => setReadings({ ...readings, max: e.target.value })}
                placeholder="340"
                className="text-sm bg-[#F9F9F9]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Test Readings</h3>
            {readings.readings.map((reading, index) => (
              <div key={index} className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`target-${index}`} className="text-[#B3B3B3] text-xs">Target</Label>
                  <Input
                    id={`target-${index}`}
                    value={reading.target}
                    onChange={(e) => {
                      const newReadings = [...readings.readings];
                      newReadings[index].target = e.target.value;
                      setReadings({ ...readings, readings: newReadings });
                    }}
                    placeholder="Target value"
                    className="text-sm bg-[#F9F9F9]"
                  />
                </div>
                <div>
                  <Label htmlFor={`actual-${index}`} className="text-[#B3B3B3] text-xs">Actual</Label>
                  <Input
                    id={`actual-${index}`}
                    value={reading.actual}
                    onChange={(e) => {
                      const newReadings = [...readings.readings];
                      newReadings[index].actual = e.target.value;
                      setReadings({ ...readings, readings: newReadings });
                    }}
                    placeholder="Actual value"
                    className="text-sm bg-[#F9F9F9]"
                  />
                </div>
                <div>
                  <Label htmlFor={`deviation-${index}`} className="text-[#B3B3B3] text-xs">Deviation %</Label>
                  <Input
                    id={`deviation-${index}`}
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
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button type="submit">Generate Certificate</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
