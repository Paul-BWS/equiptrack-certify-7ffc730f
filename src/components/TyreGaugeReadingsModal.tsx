import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";

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

const ENGINEERS = [
  "Paul Jones",
  "Connor Hill",
  "Tom Hannon",
  "Mark Allen",
  "Dominic Jones"
];

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
  const [result, setResult] = useState("PASS");
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
          service_date: date?.toISOString(),
          retest_date: retestDate?.toISOString(),
          model: model,
          serial_number: serialNumber,
          engineer: engineer,
          min_pressure: min,
          max_pressure: max,
          units: units,
          result: result,
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
          <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="certNumber" className="text-sm text-[#C8C8C9]">Certificate Number</Label>
                <Input
                  id="certNumber"
                  value={certNumber}
                  onChange={(e) => setCertNumber(e.target.value)}
                  placeholder="e.g. BWS10099"
                  className="h-12 bg-white border-gray-200 placeholder:text-[#C8C8C9]"
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-[#C8C8C9]">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-12 bg-white border-gray-200",
                        !date && "text-[#C8C8C9]"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-[#C8C8C9]">Retest Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-12 bg-white border-gray-200",
                        !retestDate && "text-[#C8C8C9]"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {retestDate ? format(retestDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={retestDate}
                      onSelect={setRetestDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm text-[#C8C8C9]">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="h-12 bg-white border-gray-200">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="model" className="text-sm text-[#C8C8C9]">Model</Label>
                <Input
                  id="model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. Halfords"
                  className="h-12 bg-white border-gray-200 placeholder:text-[#C8C8C9]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serialNumber" className="text-sm text-[#C8C8C9]">Serial Number</Label>
                <Input
                  id="serialNumber"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder="e.g. QAR 127"
                  className="h-12 bg-white border-gray-200 placeholder:text-[#C8C8C9]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="engineer" className="text-sm text-[#C8C8C9]">Engineer</Label>
                <Select value={engineer} onValueChange={setEngineer}>
                  <SelectTrigger className="h-12 bg-white border-gray-200">
                    <SelectValue placeholder="Select an engineer" />
                  </SelectTrigger>
                  <SelectContent>
                    {ENGINEERS.map((eng) => (
                      <SelectItem key={eng} value={eng}>
                        {eng}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="min" className="text-sm text-[#C8C8C9]">Minimum</Label>
                <Input
                  id="min"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  type="number"
                  placeholder="Min pressure"
                  className="h-12 bg-white border-gray-200 placeholder:text-[#C8C8C9]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max" className="text-sm text-[#C8C8C9]">Maximum</Label>
                <Input
                  id="max"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  type="number"
                  placeholder="Max pressure"
                  className="h-12 bg-white border-gray-200 placeholder:text-[#C8C8C9]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="units" className="text-sm text-[#C8C8C9]">Units</Label>
                <Select value={units} onValueChange={setUnits}>
                  <SelectTrigger className="h-12 bg-white border-gray-200">
                    <SelectValue placeholder="Select units" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="psi">PSI</SelectItem>
                    <SelectItem value="bar">BAR</SelectItem>
                    <SelectItem value="kpa">kPa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Readings</h3>
            <div className="space-y-6">
              {readings.map((reading, index) => (
                <div key={index} className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm text-[#C8C8C9]">Setting {index + 1}</Label>
                    <Input
                      value={reading.setting}
                      onChange={(e) => {
                        const newReadings = [...readings];
                        newReadings[index].setting = e.target.value;
                        setReadings(newReadings);
                      }}
                      className="h-12 bg-white border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-[#C8C8C9]">Reading {index + 1}</Label>
                    <Input
                      value={reading.reading}
                      onChange={(e) => {
                        const newReadings = [...readings];
                        newReadings[index].reading = e.target.value;
                        setReadings(newReadings);
                      }}
                      className="h-12 bg-white border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-[#C8C8C9]">Deviation {index + 1}</Label>
                    <Input
                      value={reading.deviation}
                      onChange={(e) => {
                        const newReadings = [...readings];
                        newReadings[index].deviation = e.target.value;
                        setReadings(newReadings);
                      }}
                      className="h-12 bg-[#F9F9F9] border-gray-200"
                      readOnly
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm text-[#C8C8C9]">Notes</Label>
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
