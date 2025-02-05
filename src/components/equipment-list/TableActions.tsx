import { Button } from "@/components/ui/button";
import { ArrowRight, Trash2, FileText } from "lucide-react";
import { useProfileData } from "@/hooks/useProfileData";

interface TableActionsProps {
  onDelete: (e: React.MouseEvent) => void;
  onGenerateCertificate: (e: React.MouseEvent) => void;
  onViewReadings: (e: React.MouseEvent) => void;
}

export const TableActions = ({ onDelete, onGenerateCertificate, onViewReadings }: TableActionsProps) => {
  const { isBWSUser } = useProfileData();

  return (
    <div className="flex justify-end gap-2">
      {isBWSUser && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="rounded-full bg-white border-[1px] border-destructive hover:bg-destructive/10 h-10 w-10 p-0"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onViewReadings}
            className="rounded-full bg-white border-[1px] border-primary hover:bg-primary/10 h-10 w-10 p-0"
          >
            <ArrowRight className="h-4 w-4 text-primary" />
          </Button>
        </>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={onGenerateCertificate}
        className="rounded-full bg-white border-[1px] border-primary hover:bg-primary/10 h-10 w-10 p-0"
      >
        <FileText className="h-4 w-4 text-primary" />
      </Button>
    </div>
  );
};