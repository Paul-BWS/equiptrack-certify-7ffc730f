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
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const AllEquipment = () => {
  const navigate = useNavigate();
  const [searchCompany, setSearchCompany] = useState("");
  const [searchEquipmentType, setSearchEquipmentType] = useState("");
  const [date, setDate] = useState<Date>();

  const { data: equipment = [] } = useQuery({
    queryKey: ['all-equipment'],
    queryFn: async () => {
      // Fetch torque wrenches
      const { data: torqueWrenches, error: torqueError } = await supabase
        .from('torque_wrench')
        .select(`
          id,
          model,
          serial_number,
          last_service_date,
          next_service_due,
          companies (name)
        `);

      if (torqueError) throw torqueError;

      // Fetch tyre gauges
      const { data: tyreGauges, error: tyreError } = await supabase
        .from('tyre_gauges')
        .select(`
          id,
          model,
          serial_number,
          last_service_date,
          next_service_due,
          companies (name)
        `);

      if (tyreError) throw tyreError;

      // Combine and format the data
      const combinedEquipment = [
        ...torqueWrenches.map(tw => ({
          id: tw.id,
          model: tw.model || '',
          serialNumber: tw.serial_number || '',
          lastServiceDate: tw.last_service_date || '',
          nextServiceDue: tw.next_service_due || '',
          companyName: tw.companies?.name || 'Unknown Company',
          equipmentType: 'Torque Wrench'
        })),
        ...tyreGauges.map(tg => ({
          id: tg.id,
          model: tg.model || '',
          serialNumber: tg.serial_number || '',
          lastServiceDate: tg.last_service_date || '',
          nextServiceDue: tg.next_service_due || '',
          companyName: tg.companies?.name || 'Unknown Company',
          equipmentType: 'Tyre Gauge'
        }))
      ];

      return combinedEquipment;
    }
  });

  const filteredEquipment = equipment.filter((item) => {
    const matchesCompany = item.companyName
      .toLowerCase()
      .includes(searchCompany.toLowerCase());
    const matchesType = item.equipmentType
      .toLowerCase()
      .includes(searchEquipmentType.toLowerCase());
    const matchesDate = !date || item.nextServiceDue === format(date, "yyyy-MM-dd");

    return matchesCompany && matchesType && matchesDate;
  });

  const handleViewReadings = (id: string) => {
    const equipment = filteredEquipment.find(e => e.id === id);
    if (equipment?.equipmentType === 'Torque Wrench') {
      navigate(`/torque-wrenches/${id}`);
    } else {
      navigate(`/tyre-gauges/${id}`);
    }
  };

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
          onViewReadings={handleViewReadings}
        />
      </main>
    </div>
  );
};

export default AllEquipment;