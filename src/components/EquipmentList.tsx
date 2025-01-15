import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { EquipmentRow } from "./equipment-list/EquipmentRow";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

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
  const isMobile = useIsMobile();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { customerId } = useParams();

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('beamsetter')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting beamsetter:', error);
        throw error;
      }

      await queryClient.invalidateQueries({
        queryKey: ['equipment', customerId, 'beamsetter']
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

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Model</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead>Last Service</TableHead>
              {!isMobile && (
                <>
                  <TableHead>Next Service</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipment.map((item) => (
              <EquipmentRow
                key={item.id}
                equipment={{
                  ...item,
                  onGenerateCertificate: () => onGenerateCertificate(item.id),
                  onDelete: () => onDeleteClick(item.id),
                  onViewReadings: () => onViewReadings(item.id)
                }}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the equipment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};