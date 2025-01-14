import { Button } from "@/components/ui/button";
import {
  FileText,
  LineChart,
  Trash2,
} from "lucide-react";

interface TableActionsProps {
  onDelete: () => void;
  onGenerateCertificate: () => void;
  onViewReadings: () => void;
}

export const TableActions = ({
  onDelete,
  onGenerateCertificate,
  onViewReadings,
}: TableActionsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        onClick={onViewReadings}
        variant="outline"
        size="icon"
        className="h-8 w-8 border-[1px]"
      >
        <LineChart className="h-4 w-4" />
      </Button>
      <Button
        onClick={onGenerateCertificate}
        variant="outline"
        size="icon"
        className="h-8 w-8 border-[1px]"
      >
        <FileText className="h-4 w-4" />
      </Button>
      <Button
        onClick={onDelete}
        variant="outline"
        size="icon"
        className="h-8 w-8 border-[1px]"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};