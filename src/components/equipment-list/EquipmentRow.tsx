import { TableCell, TableRow } from "@/components/ui/table";
import { format, parseISO } from "date-fns";
import { TableActions } from "./TableActions";
import { EquipmentWithActions } from "@/types/equipment-responses";
import { useIsMobile } from "@/hooks/use-mobile";

interface EquipmentRowProps {
  equipment: EquipmentWithActions;
}

export const EquipmentRow = ({ equipment }: EquipmentRowProps) => {
  const isMobile = useIsMobile();
  
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <TableRow
      className={isMobile ? "cursor-pointer hover:bg-accent/50" : undefined}
      onClick={() => isMobile ? equipment.onViewReadings() : undefined}
    >
      <TableCell>{equipment.model}</TableCell>
      <TableCell>{equipment.serialNumber}</TableCell>
      <TableCell>{formatDate(equipment.lastServiceDate)}</TableCell>
      {!isMobile && (
        <>
          <TableCell>{formatDate(equipment.nextServiceDue)}</TableCell>
          <TableCell className="text-right">
            <TableActions
              onDelete={equipment.onDelete}
              onGenerateCertificate={equipment.onGenerateCertificate}
              onViewReadings={equipment.onViewReadings}
            />
          </TableCell>
        </>
      )}
    </TableRow>
  );
};