import { useState } from "react";
import { useEquipmentQuery } from "@/hooks/useEquipmentQuery";
import { EquipmentListHeader } from "./EquipmentListHeader";
import { EquipmentListTable } from "./EquipmentListTable";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export const EquipmentList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: equipment = [], isLoading } = useEquipmentQuery({ enabled: true });

  const filteredEquipment = equipment.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleDelete = async (id: string) => {
    try {
      const { error: certificatesError } = await supabase
        .from('certificates')
        .delete()
        .eq('torque_wrench_id', id);

      if (certificatesError) {
        console.error('Error deleting certificates:', certificatesError);
        throw certificatesError;
      }

      const { error: torqueWrenchError } = await supabase
        .from('torque_wrench')
        .delete()
        .eq('id', id);

      if (torqueWrenchError) {
        console.error('Error deleting torque wrench:', torqueWrenchError);
        throw torqueWrenchError;
      }

      toast.success("Equipment deleted successfully");
      window.location.reload();
    } catch (error: any) {
      console.error('Error deleting equipment:', error);
      toast.error("Failed to delete equipment");
    }
  };

  const handleViewReadings = (id: string) => {
    const equipment = filteredEquipment.find(e => e.id === id);
    if (equipment?.equipmentType === 'Torque Wrench') {
      navigate(`/torque-wrenches/${id}`);
    } else {
      navigate(`/tyre-gauges/${id}`);
    }
  };

  const handleGenerateCertificate = (id: string) => {
    console.log("Generate certificate for:", id);
  };

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
      <EquipmentListTable 
        equipment={filteredEquipment}
        onGenerateCertificate={handleGenerateCertificate}
        onDelete={handleDelete}
        onViewReadings={handleViewReadings}
      />
    </div>
  );
};