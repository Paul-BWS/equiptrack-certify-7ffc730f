import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface EquipmentListProps {
  equipment: Array<{
    id: string;
    name: string;
    serialNumber: string;
    manufacturer: string;
    model: string;
    lastServiceDate: string;
    nextServiceDue: string;
  }>;
  onGenerateCertificate: (id: string) => void;
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
            <TableHead>Equipment Name</TableHead>
            {!isMobile && (
              <>
                <TableHead>Serial Number</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Model</TableHead>
              </>
            )}
            <TableHead>Last Service</TableHead>
            <TableHead>Next Service</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              {!isMobile && (
                <>
                  <TableCell>{item.serialNumber}</TableCell>
                  <TableCell>{item.manufacturer}</TableCell>
                  <TableCell>{item.model}</TableCell>
                </>
              )}
              <TableCell>{item.lastServiceDate}</TableCell>
              <TableCell>{item.nextServiceDue}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onGenerateCertificate(item.id)}
                  className="rounded-full bg-primary hover:bg-primary/90"
                >
                  <ArrowRight className="h-4 w-4 text-primary-foreground" strokeWidth={2} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};