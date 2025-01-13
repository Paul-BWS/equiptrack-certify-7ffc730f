import { TableCell, TableRow } from "@/components/ui/table";
import { format, parseISO } from "date-fns";
import { TableActions } from "./TableActions";

interface EquipmentRowProps {
  id: string;
  model: string;
  serialNumber: string;
  lastServiceDate: string;
  nextServiceDue: string;
  companyName?: string;
  equipmentType?: string;
  isMobile: boolean;
  onGenerateCertificate: () => void;
  onDelete: (e: React.MouseEvent) => void;
  onViewReadings: () => void;
}

export const EquipmentRow = ({
  id,
  model,
  companyName = "Unknown Company",
  equipmentType = "Unknown Type",
  lastServiceDate,
  nextServiceDue,
  isMobile,
  onGenerateCertificate,
  onDelete,
  onViewReadings,
}: EquipmentRowProps) => {
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
      <TableCell>{companyName}</TableCell>
      <TableCell>{equipmentType}</TableCell>
      <TableCell>{model}</TableCell>
      <TableCell>{formatDate(lastServiceDate)}</TableCell>
      <TableCell>{formatDate(nextServiceDue)}</TableCell>
      <TableCell className="text-right">
        <TableActions
          onDelete={onDelete}
          onGenerateCertificate={onGenerateCertificate}
          onViewReadings={onViewReadings}
        />
      </TableCell>
    </TableRow>
  );
};