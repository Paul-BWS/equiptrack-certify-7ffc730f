import { Button } from "@/components/ui/button";
import { ArrowRight, Trash2, FileText } from "lucide-react";

interface TableActionsProps {
  onDelete: (e: React.MouseEvent) => void;
  onGenerateCertificate: () => void;
  onViewReadings: () => void;
}

export const TableActions = ({ onDelete, onGenerateCertificate, onViewReadings }: TableActionsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="rounded-full bg-destructive hover:bg-destructive/90 h-10 w-10 p-0"
      >
        <Trash2 className="h-4 w-4 text-destructive-foreground" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onGenerateCertificate}
        className="rounded-full bg-green-600 hover:bg-green-700 h-10 w-10 p-0"
      >
        <FileText className="h-4 w-4 text-white" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onViewReadings}
        className="rounded-full bg-primary hover:bg-primary/90 h-10 w-10 p-0"
      >
        <ArrowRight className="h-4 w-4 text-primary-foreground" />
      </Button>
    </div>
  );
};