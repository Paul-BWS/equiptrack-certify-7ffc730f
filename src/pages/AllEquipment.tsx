import { Navigation } from "@/components/Navigation";
import { useState } from "react";
import { format } from "date-fns";
import { EquipmentList } from "@/components/EquipmentList";
import { useNavigate } from "react-router-dom";
import { SearchFilters } from "@/components/equipment/SearchFilters";
import { useEquipmentQuery } from "@/hooks/useEquipmentQuery";

const AllEquipment = () => {
  const navigate = useNavigate();
  const [searchCompany, setSearchCompany] = useState("");
  const [searchEquipmentType, setSearchEquipmentType] = useState("");
  const [date, setDate] = useState<Date>();

  const { data: equipment = [] } = useEquipmentQuery();

  const filteredEquipment = equipment.filter((item) => {
    const matchesCompany = item.companyName
      ?.toLowerCase()
      .includes(searchCompany.toLowerCase()) ?? false;
    const matchesType = item.equipmentType
      ?.toLowerCase()
      .includes(searchEquipmentType.toLowerCase()) ?? false;
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

        <SearchFilters
          searchCompany={searchCompany}
          setSearchCompany={setSearchCompany}
          searchEquipmentType={searchEquipmentType}
          setSearchEquipmentType={setSearchEquipmentType}
          date={date}
          setDate={setDate}
        />

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