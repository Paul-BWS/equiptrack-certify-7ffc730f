import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Equipment } from "@/types/equipment-responses";
import { useQueryClient } from "@tanstack/react-query";

export const useEquipmentHandlers = (equipment: Equipment[]) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
      // Invalidate and refetch equipment data instead of page reload
      queryClient.invalidateQueries({ queryKey: ['all-equipment'] });
    } catch (error: any) {
      console.error('Error deleting equipment:', error);
      toast.error("Failed to delete equipment");
    }
  };

  const handleViewReadings = (id: string) => {
    const equipmentItem = equipment.find(e => e.id === id);
    if (equipmentItem?.equipmentType === 'Torque Wrench') {
      navigate(`/torque-wrenches/${id}`);
    } else {
      navigate(`/tyre-gauges/${id}`);
    }
  };

  const handleGenerateCertificate = (id: string) => {
    console.log("Generate certificate for:", id);
  };

  return {
    handleDelete,
    handleViewReadings,
    handleGenerateCertificate,
  };
};