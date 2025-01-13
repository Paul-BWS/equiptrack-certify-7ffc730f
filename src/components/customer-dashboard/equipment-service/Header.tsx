import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface HeaderProps {
  showEmailButton: boolean;
  onSendReminder: () => void;
}

export const Header = ({ showEmailButton, onSendReminder }: HeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <CardTitle className="text-xl font-semibold text-gray-900">
        Equipment Due for Service
      </CardTitle>
      {showEmailButton && (
        <Button
          variant="outline"
          size="icon"
          onClick={onSendReminder}
          className="rounded-full bg-white border-2 border-primary hover:bg-primary/10"
        >
          <Mail className="h-4 w-4 text-primary" strokeWidth={2} />
        </Button>
      )}
    </div>
  );
};