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

interface EquipmentListProps {
  equipment: Array<{
    id: string;
    model: string;
    serialNumber: string;
    lastServiceDate: string;
    nextServiceDue: string;
  }>;
  onGenerateCertificate: (id: string) => void;
}

export const EquipmentList = ({
  equipment,
  onGenerateCertificate,
}: EquipmentListProps) => {
  const isMobile = useIsMobile();

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('torque_wrench')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success("Equipment deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error('Error deleting equipment:', error);
      toast.error("Failed to delete equipment");
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Model</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Test Date</TableHead>
            {!isMobile && <TableHead>Retest Date</TableHead>}
            {!isMobile && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.map((item) => (
            <EquipmentRow
              key={item.id}
              {...item}
              isMobile={isMobile}
              onGenerateCertificate={() => onGenerateCertificate(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};