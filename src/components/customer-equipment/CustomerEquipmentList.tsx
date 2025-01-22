import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown, Printer, Search } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Equipment {
  id: string;
  model: string;
  serialNumber: string;
  lastServiceDate: string;
  nextServiceDue: string;
  equipmentType: string;
}

export const CustomerEquipmentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"date" | "type" | "due">("due");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const { data: equipment = [], isLoading } = useQuery({
    queryKey: ['customer-equipment'],
    queryFn: async () => {
      const { data: torqueWrenches, error: torqueError } = await supabase
        .from('torque_wrench')
        .select('*')
        .order('next_service_due', { ascending: true });

      if (torqueError) {
        console.error('Error fetching torque wrenches:', torqueError);
        throw torqueError;
      }

      const { data: tyreGauges, error: tyreError } = await supabase
        .from('tyre_gauges')
        .select('*')
        .order('next_service_due', { ascending: true });

      if (tyreError) {
        console.error('Error fetching tyre gauges:', tyreError);
        throw tyreError;
      }

      return [
        ...(torqueWrenches?.map(tw => ({
          id: tw.id,
          model: tw.model || '',
          serialNumber: tw.serial_number || '',
          lastServiceDate: tw.last_service_date || '',
          nextServiceDue: tw.next_service_due || '',
          equipmentType: 'Torque Wrench'
        })) || []),
        ...(tyreGauges?.map(tg => ({
          id: tg.id,
          model: tg.model || '',
          serialNumber: tg.serial_number || '',
          lastServiceDate: tg.last_service_date || '',
          nextServiceDue: tg.next_service_due || '',
          equipmentType: 'Tyre Gauge'
        })) || [])
      ];
    }
  });

  const handleSort = (field: "date" | "type" | "due") => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handlePrintCertificate = (id: string) => {
    toast.success("Generating certificate...");
    // Implement certificate generation logic
  };

  const filteredAndSortedEquipment = [...(equipment || [])]
    .filter(item => 
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.equipmentType.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const multiplier = sortDirection === "asc" ? 1 : -1;
      
      switch (sortField) {
        case "date":
          return multiplier * (new Date(a.lastServiceDate).getTime() - new Date(b.lastServiceDate).getTime());
        case "type":
          return multiplier * a.equipmentType.localeCompare(b.equipmentType);
        case "due":
          return multiplier * (new Date(a.nextServiceDue).getTime() - new Date(b.nextServiceDue).getTime());
        default:
          return 0;
      }
    });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Promotional Banner */}
      <a 
        href="https://www.basicwelding.co.uk/torque-wrenches" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        <Card className="bg-blue-50 hover:bg-blue-100 transition-colors">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-blue-900">Looking for a New Torque Wrench?</h3>
            <p className="text-blue-700 mt-2">
              Visit our website to explore our range of professional torque wrenches
            </p>
          </CardContent>
        </Card>
      </a>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search equipment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleSort("date")}
            className="whitespace-nowrap"
          >
            Date <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSort("type")}
            className="whitespace-nowrap"
          >
            Type <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSort("due")}
            className="whitespace-nowrap"
          >
            Due <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Equipment List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Equipment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAndSortedEquipment.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm text-gray-900">{item.model}</h3>
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
                      {item.equipmentType}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">S/N: {item.serialNumber}</p>
                  <p className="text-xs text-gray-500">
                    Next Service: {format(parseISO(item.nextServiceDue), 'dd/MM/yyyy')}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePrintCertificate(item.id)}
                  className="h-8 w-8"
                >
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {filteredAndSortedEquipment.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No equipment found
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};