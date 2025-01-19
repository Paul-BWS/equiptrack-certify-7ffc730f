import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Trash2, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Equipment {
  id: string;
  model: string;
  serialNumber: string;
  lastServiceDate: string;
  nextServiceDue: string;
  companyName?: string;
  equipmentType?: string;
  onGenerateCertificate: () => void;
  onDelete: () => void;
  onViewReadings: () => void;
}

interface EquipmentTableProps {
  equipment: Equipment[];
}

export const EquipmentTable = ({ equipment }: EquipmentTableProps) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
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

  return (
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
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.model}</TableCell>
            <TableCell>{formatSerialNumber(item.serialNumber)}</TableCell>
            <TableCell>{formatDate(item.lastServiceDate)}</TableCell>
            <TableCell>{formatDate(item.nextServiceDue)}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={item.onDelete}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={item.onViewReadings}
                  className="h-8 w-8"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={item.onGenerateCertificate}
                  className="h-8 w-8"
                >
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
