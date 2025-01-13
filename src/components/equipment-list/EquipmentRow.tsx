import { TableCell, TableRow } from "@/components/ui/table";
import { format, parseISO } from "date-fns";
import { TableActions } from "./TableActions";
import { Equipment } from "@/types/equipment-responses";

interface EquipmentRowProps {
  equipment: Equipment;
}

export const EquipmentRow = ({ equipment }: EquipmentRowProps) => {
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <TableRow>
      <TableCell>{equipment.model}</TableCell>
      <TableCell>{equipment.serialNumber}</TableCell>
      <TableCell>{equipment.companyName || 'Unknown Company'}</TableCell>
      <TableCell>{formatDate(equipment.lastServiceDate)}</TableCell>
      <TableCell>{formatDate(equipment.nextServiceDue)}</TableCell>
      <TableCell>{equipment.equipmentType || 'Unknown Type'}</TableCell>
      <TableCell className="text-right">
        <TableActions
          onDelete={() => console.log('Delete:', equipment.id)}
          onGenerateCertificate={() => console.log('Generate Certificate:', equipment.id)}
          onViewReadings={() => console.log('View Readings:', equipment.id)}
        />
      </TableCell>
    </TableRow>
  );
};