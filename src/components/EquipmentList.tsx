import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { EquipmentTable } from "./equipment-list/EquipmentTable";
import { DeleteEquipmentDialog } from "./equipment-list/DeleteEquipmentDialog";

interface EquipmentListProps {
  equipment: Array<{
    id: string;
    model: string;
    serialNumber: string;
    lastServiceDate: string;
    nextServiceDue: string;
    companyName?: string;
    equipmentType?: string;
  }>;
  onGenerateCertificate: (id: string) => void;
  onViewReadings: (id: string) => void;
}

export const EquipmentList = ({
  equipment,
  onGenerateCertificate,
  onViewReadings,
}: EquipmentListProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { customerId } = useParams();

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('torque_wrench')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting torque wrench:', error);
        throw error;
      }

      await queryClient.invalidateQueries({
        queryKey: ['equipment', customerId, 'torque-wrenches']
      });
      
      toast.success("Equipment deleted successfully");
      setIsDeleteDialogOpen(false);
      setEquipmentToDelete(null);
    } catch (error: any) {
      console.error('Error deleting equipment:', error);
      toast.error("Failed to delete equipment");
    }
  };

  const onDeleteClick = (id: string) => {
    setEquipmentToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const onConfirmDelete = () => {
    if (equipmentToDelete) {
      handleDelete(equipmentToDelete);
    }
  };

  const equipmentWithHandlers = equipment.map(item => ({
    ...item,
    onGenerateCertificate: () => onGenerateCertificate(item.id),
    onDelete: () => onDeleteClick(item.id),
    onViewReadings: () => onViewReadings(item.id)
  }));

  return (
    <>
      <EquipmentTable equipment={equipmentWithHandlers} />
      <DeleteEquipmentDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirmDelete={onConfirmDelete}
      />
    </>
  );
};