import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  title: string;
  message: string;
  suggestion?: string;
}

export const ErrorDisplay = ({ title, message, suggestion }: ErrorDisplayProps) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="container mx-auto py-6">
      <Alert variant="destructive" className="relative">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="space-y-4">
          <p>{message}</p>
          {suggestion && <p className="text-sm text-gray-500">{suggestion}</p>}
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4"
            onClick={handleRefresh}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh Page
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};