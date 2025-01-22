import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  title: string;
  message: string;
  suggestion?: string;
}

export const ErrorDisplay = ({ title, message, suggestion }: ErrorDisplayProps) => {
  return (
    <div className="container mx-auto py-6">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="space-y-4">
          <p>{message}</p>
          {suggestion && <p className="text-sm">{suggestion}</p>}
        </AlertDescription>
      </Alert>
    </div>
  );
};