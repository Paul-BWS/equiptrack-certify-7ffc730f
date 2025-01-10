import { Equipment } from "@/types/equipment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, PenTool } from "lucide-react";

interface EquipmentListProps {
  equipment: Equipment[];
  onGenerateCertificate: (equipmentId: string) => void;
  onEdit?: (equipmentId: string) => void;
}

export const EquipmentList = ({
  equipment,
  onGenerateCertificate,
  onEdit,
}: EquipmentListProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Last Service</TableHead>
            <TableHead>Next Due</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.serialNumber}</TableCell>
              <TableCell>{item.lastServiceDate}</TableCell>
              <TableCell>{item.nextServiceDue}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit?.(item.id)}
                  >
                    <PenTool className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onGenerateCertificate(item.id)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Certificate
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};