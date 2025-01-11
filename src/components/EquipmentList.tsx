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
import { Pen } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface EquipmentListProps {
  equipment: Equipment[];
  onGenerateCertificate: (equipmentId: string) => void;
}

export const EquipmentList = ({
  equipment,
  onGenerateCertificate,
}: EquipmentListProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden md:table-cell">Name</TableHead>
            <TableHead>Serial</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="hidden sm:table-cell">Retest</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="hidden md:table-cell font-medium">{item.name}</TableCell>
              <TableCell>{item.serialNumber}</TableCell>
              <TableCell>{item.lastServiceDate}</TableCell>
              <TableCell className="hidden sm:table-cell">{item.nextServiceDue}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onGenerateCertificate(item.id)}
                  className="hover:bg-transparent p-0"
                >
                  <Pen className="h-5 w-5 text-[#1D4ED8]" strokeWidth={2.5} />
                  {!isMobile && <span className="ml-2">Edit</span>}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};