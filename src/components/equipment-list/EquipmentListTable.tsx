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
}

export const EquipmentListTable = ({ equipment }: EquipmentListTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Model</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Last Service</TableHead>
            <TableHead>Next Service</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.map((item) => (
            <EquipmentRow key={item.id} equipment={item} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};