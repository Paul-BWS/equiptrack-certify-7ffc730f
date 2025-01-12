import { TableCell, TableRow } from "@/components/ui/table";
import { format, parseISO } from "date-fns";
import { TableActions } from "./TableActions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface EquipmentRowProps {
  id: string;
  model: string;
  serialNumber: string;
  lastServiceDate: string;
  nextServiceDue: string;
  isMobile: boolean;
  onGenerateCertificate: () => void;
  onDelete: (e: React.MouseEvent) => void;
  onViewReadings: () => void;
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
    <TableRow 
      className={isMobile ? "relative cursor-pointer hover:bg-muted/60" : ""}
      onClick={isMobile ? onViewReadings : undefined}
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
            onViewReadings={onViewReadings}
          />
        </TableCell>
      )}
      {isMobile && (
        <TableCell className="absolute right-2 top-1/2 -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(e);
            }}
            className="rounded-full bg-destructive hover:bg-destructive/90 h-8 w-8 p-0"
          >
            <Trash2 className="h-4 w-4 text-destructive-foreground" />
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};