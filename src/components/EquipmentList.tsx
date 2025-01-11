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
    model: string;
    serialNumber: string;
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
            <TableHead>Model</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Test Date</TableHead>
            {!isMobile && <TableHead>Retest Date</TableHead>}
            {!isMobile && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.map((item) => (
            <TableRow 
              key={item.id}
              className={isMobile ? "cursor-pointer hover:bg-muted/60" : ""}
              onClick={isMobile ? () => onGenerateCertificate(item.id) : undefined}
            >
              <TableCell>{item.model}</TableCell>
              <TableCell>{item.serialNumber}</TableCell>
              <TableCell>{item.lastServiceDate}</TableCell>
              {!isMobile && <TableCell>{item.nextServiceDue}</TableCell>}
              {!isMobile && (
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onGenerateCertificate(item.id)}
                    className="rounded-full bg-primary hover:bg-primary/90 h-10 w-10 p-0"
                  >
                    <ArrowRight className="h-4 w-4 text-primary-foreground" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};