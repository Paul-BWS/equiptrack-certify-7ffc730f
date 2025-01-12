import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorScreenProps {
  message: string;
}

export const ErrorScreen = ({ message }: ErrorScreenProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <Alert variant="destructive">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      </div>
    </div>
  );
};