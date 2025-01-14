import { Equipment } from "@/types/equipment-responses";
import { EquipmentRow } from "./EquipmentRow";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EquipmentListTableProps {
  equipment: Equipment[];
  onGenerateCertificate: (id: string) => void;
  onDelete: (id: string) => void;
  onViewReadings: (id: string) => void;
}

export const EquipmentListTable = ({ 
  equipment,
  onGenerateCertificate,
  onDelete,
  onViewReadings
}: EquipmentListTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Model</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Last Service</TableHead>
            <TableHead>Next Service</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.map((item) => (
            <EquipmentRow
              key={item.id}
              equipment={{
                ...item,
                onGenerateCertificate: () => onGenerateCertificate(item.id),
                onDelete: () => onDelete(item.id),
                onViewReadings: () => onViewReadings(item.id)
              }}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};