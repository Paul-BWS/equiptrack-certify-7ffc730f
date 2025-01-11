import { Navigation } from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EquipmentList } from "@/components/EquipmentList";

// Sample data - in a real app, this would come from your backend
const sampleEquipment = [
  {
    id: "1",
    name: "Torque Wrench XL",
    serialNumber: "TW-001",
    customerName: "ABC Industries",
    model: "TP-100",
    lastServiceDate: "2023-06-15",
    nextServiceDue: "2024-06-15",
  },
  {
    id: "2",
    name: "Pressure Gauge",
    serialNumber: "PG-002",
    customerName: "XYZ Corporation",
    model: "PT-200",
    lastServiceDate: "2023-07-20",
    nextServiceDue: "2024-05-20",
  },
];

const AllEquipment = () => {
  const [searchCompany, setSearchCompany] = useState("");
  const [searchEquipmentType, setSearchEquipmentType] = useState("");
  const [date, setDate] = useState<Date>();

  const filteredEquipment = sampleEquipment.filter((equipment) => {
    const matchesCompany = equipment.customerName
      .toLowerCase()
      .includes(searchCompany.toLowerCase());
    const matchesType = equipment.name
      .toLowerCase()
      .includes(searchEquipmentType.toLowerCase());
    const matchesDate = !date || equipment.nextServiceDue === format(date, "yyyy-MM-dd");

    return matchesCompany && matchesType && matchesDate;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            All Equipment
          </h1>
          <p className="text-muted-foreground">
            Search and manage all equipment across customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by company..."
              value={searchCompany}
              onChange={(e) => setSearchCompany(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by equipment type..."
              value={searchEquipmentType}
              onChange={(e) => setSearchEquipmentType(e.target.value)}
              className="pl-10"
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
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

        <EquipmentList
          equipment={filteredEquipment}
          onGenerateCertificate={(id) => {
            console.log("Generate certificate for:", id);
          }}
        />
      </main>
    </div>
  );
};

export default AllEquipment;