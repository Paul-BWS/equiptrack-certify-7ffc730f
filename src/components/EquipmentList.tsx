import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { format, parseISO } from "date-fns";

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
      // Refresh the page to update the list
      window.location.reload();
    } catch (error) {
      console.error('Error deleting equipment:', error);
      toast.error("Failed to delete equipment");
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString; // Return original string if parsing fails
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
            <TableRow 
              key={item.id}
              className={isMobile ? "cursor-pointer hover:bg-muted/60" : ""}
              onClick={isMobile ? () => onGenerateCertificate(item.id) : undefined}
            >
              <TableCell>{item.model}</TableCell>
              <TableCell>{item.serialNumber}</TableCell>
              <TableCell>{formatDate(item.lastServiceDate)}</TableCell>
              {!isMobile && <TableCell>{formatDate(item.nextServiceDue)}</TableCell>}
              {!isMobile && (
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="rounded-full bg-destructive hover:bg-destructive/90 h-10 w-10 p-0"
                    >
                      <Trash2 className="h-4 w-4 text-destructive-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onGenerateCertificate(item.id)}
                      className="rounded-full bg-primary hover:bg-primary/90 h-10 w-10 p-0"
                    >
                      <ArrowRight className="h-4 w-4 text-primary-foreground" />
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};