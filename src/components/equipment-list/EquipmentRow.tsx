import { TableCell, TableRow } from "@/components/ui/table";
import { format, parseISO } from "date-fns";
import { TableActions } from "./TableActions";
import { EquipmentWithActions } from "@/types/equipment-responses";
import { useIsMobile } from "@/hooks/use-mobile";
import { useProfileData } from "@/hooks/useProfileData";

interface EquipmentRowProps {
  equipment: EquipmentWithActions;
}

export const EquipmentRow = ({ equipment }: EquipmentRowProps) => {
  const isMobile = useIsMobile();
  const { isBWSUser } = useProfileData();
  
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  const formatSerialNumber = (serialNumber: string) => {
    // If serial number already starts with BWS-, return as is
    if (serialNumber.startsWith('BWS-')) {
      return serialNumber;
    }
    // Otherwise, format it to match the modal format
    const numericPart = serialNumber.replace(/\D/g, '').slice(0, 5);
    return numericPart ? `BWS-${numericPart.padStart(5, '0')}` : serialNumber;
  };

  const handleRowClick = (e: React.MouseEvent) => {
    if (isMobile && isBWSUser) {
      e.preventDefault();
      e.stopPropagation();
      equipment.onViewReadings();
    }
  };

  return (
    <TableRow
      className={isMobile && isBWSUser ? "cursor-pointer hover:bg-accent/50" : undefined}
      onClick={handleRowClick}
    >
      <TableCell>{equipment.model}</TableCell>
      <TableCell>{formatSerialNumber(equipment.serialNumber)}</TableCell>
      <TableCell>{formatDate(equipment.lastServiceDate)}</TableCell>
      {!isMobile && (
        <>
          <TableCell>{formatDate(equipment.nextServiceDue)}</TableCell>
          <TableCell className="text-right">
            <TableActions
              onDelete={(e) => {
                e.preventDefault();
                e.stopPropagation();
                equipment.onDelete();
              }}
              onGenerateCertificate={(e) => {
                e.preventDefault();
                e.stopPropagation();
                equipment.onGenerateCertificate();
              }}
              onViewReadings={(e) => {
                e.preventDefault();
                e.stopPropagation();
                equipment.onViewReadings();
              }}
            />
          </TableCell>
        </>
      )}
    </TableRow>
  );
};
