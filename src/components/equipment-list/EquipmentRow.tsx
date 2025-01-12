import { TableCell, TableRow } from "@/components/ui/table";
import { format, parseISO } from "date-fns";
import { TableActions } from "./TableActions";

interface EquipmentRowProps {
  id: string;
  model: string;
  serialNumber: string;
  lastServiceDate: string;
  nextServiceDue: string;
  isMobile: boolean;
  onGenerateCertificate: () => void;
  onDelete: (e: React.MouseEvent) => void;
}

export const EquipmentRow = ({
  id,
  model,
  serialNumber,
  lastServiceDate,
  nextServiceDue,
  isMobile,
  onGenerateCertificate,
  onDelete,
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
    <TableRow 
      className={isMobile ? "cursor-pointer hover:bg-muted/60" : ""}
      onClick={isMobile ? onGenerateCertificate : undefined}
    >
      <TableCell>{model}</TableCell>
      <TableCell>{serialNumber}</TableCell>
      <TableCell>{formatDate(lastServiceDate)}</TableCell>
      {!isMobile && <TableCell>{formatDate(nextServiceDue)}</TableCell>}
      {!isMobile && (
        <TableCell className="text-right">
          <TableActions
            onDelete={(e) => {
              e.stopPropagation();
              onDelete(e);
            }}
            onGenerateCertificate={onGenerateCertificate}
          />
        </TableCell>
      )}
    </TableRow>
  );
};