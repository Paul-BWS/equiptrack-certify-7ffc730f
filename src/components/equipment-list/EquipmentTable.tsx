import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import { EquipmentRow } from "./EquipmentRow";
import { Equipment } from "@/types/equipment-responses";

interface EquipmentTableProps {
  equipment: Array<Equipment & {
    onGenerateCertificate: () => void;
    onDelete: () => void;
    onViewReadings: () => void;
  }>;
}

export const EquipmentTable = ({ equipment }: EquipmentTableProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Model</TableHead>
            <TableHead className="w-[20%]">Serial Number</TableHead>
            <TableHead className="w-[20%]">Last Service</TableHead>
            {!isMobile && (
              <>
                <TableHead className="w-[20%]">Next Service</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.map((item) => (
            <EquipmentRow
              key={item.id}
              equipment={item}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};