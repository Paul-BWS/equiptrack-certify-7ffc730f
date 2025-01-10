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
    // Handle form submission and certificate generation
    console.log("Form submitted:", readings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Torque Wrench Readings</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="certNumber">Certificate Number</Label>
              <Input
                id="certNumber"
                value={readings.certNumber}
                onChange={(e) => setReadings({ ...readings, certNumber: e.target.value })}
                placeholder="BWS13009"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Test Date</Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  value={readings.date}
                  onChange={(e) => setReadings({ ...readings, date: e.target.value })}
                />
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={readings.model}
                onChange={(e) => setReadings({ ...readings, model: e.target.value })}
                placeholder="Silver (red handle)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input
                id="serialNumber"
                value={readings.serialNumber}
                onChange={(e) => setReadings({ ...readings, serialNumber: e.target.value })}
                placeholder="TW01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="engineer">Engineer</Label>
              <Input
                id="engineer"
                value={readings.engineer}
                onChange={(e) => setReadings({ ...readings, engineer: e.target.value })}
                placeholder="Engineer name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="retestDate">Retest Date</Label>
              <div className="relative">
                <Input
                  id="retestDate"
                  type="date"
                  value={readings.retestDate}
                  onChange={(e) => setReadings({ ...readings, retestDate: e.target.value })}
                />
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="min">Minimum Value</Label>
              <Input
                id="min"
                type="number"
                value={readings.min}
                onChange={(e) => setReadings({ ...readings, min: e.target.value })}
                placeholder="40"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max">Maximum Value</Label>
              <Input
                id="max"
                type="number"
                value={readings.max}
                onChange={(e) => setReadings({ ...readings, max: e.target.value })}
                placeholder="340"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Test Readings</h3>
            {readings.readings.map((reading, index) => (
              <div key={index} className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`target-${index}`}>Target</Label>
                  <Input
                    id={`target-${index}`}
                    value={reading.target}
                    onChange={(e) => {
                      const newReadings = [...readings.readings];
                      newReadings[index].target = e.target.value;
                      setReadings({ ...readings, readings: newReadings });
                    }}
                    placeholder="Target value"
                  />
                </div>
                <div>
                  <Label htmlFor={`actual-${index}`}>Actual</Label>
                  <Input
                    id={`actual-${index}`}
                    value={reading.actual}
                    onChange={(e) => {
                      const newReadings = [...readings.readings];
                      newReadings[index].actual = e.target.value;
                      setReadings({ ...readings, readings: newReadings });
                    }}
                    placeholder="Actual value"
                  />
                </div>
                <div>
                  <Label htmlFor={`deviation-${index}`}>Deviation %</Label>
                  <Input
                    id={`deviation-${index}`}
                    value={reading.deviation}
                    onChange={(e) => {
                      const newReadings = [...readings.readings];
                      newReadings[index].deviation = e.target.value;
                      setReadings({ ...readings, readings: newReadings });
                    }}
                    placeholder="Deviation"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Generate Certificate</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};