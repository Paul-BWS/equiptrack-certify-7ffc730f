import { Loader2 } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    </div>
  );
};