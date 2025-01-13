import { useState } from "react";
import { useEquipmentQuery } from "@/hooks/useEquipmentQuery";
import { EquipmentListHeader } from "./EquipmentListHeader";
import { EquipmentListTable } from "./EquipmentListTable";
import { LoadingState } from "./LoadingState";
import { useEquipmentHandlers } from "@/hooks/useEquipmentHandlers";

export const EquipmentList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: equipment = [], isLoading } = useEquipmentQuery({ enabled: true });

  const filteredEquipment = equipment.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const {
    handleDelete,
    handleViewReadings,
    handleGenerateCertificate,
  } = useEquipmentHandlers(filteredEquipment);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-4">
      <EquipmentListHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <EquipmentListTable 
        equipment={filteredEquipment}
        onGenerateCertificate={handleGenerateCertificate}
        onDelete={handleDelete}
        onViewReadings={handleViewReadings}
      />
    </div>
  );
};