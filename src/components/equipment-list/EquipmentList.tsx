import { useState } from "react";
import { useEquipmentQuery } from "@/hooks/useEquipmentQuery";
import { EquipmentListHeader } from "./EquipmentListHeader";
import { EquipmentListTable } from "./EquipmentListTable";
import { Loader2 } from "lucide-react";

export const EquipmentList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: equipment = [], isLoading } = useEquipmentQuery({ enabled: true });

  const filteredEquipment = equipment.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <EquipmentListHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <EquipmentListTable equipment={filteredEquipment} />
    </div>
  );
};