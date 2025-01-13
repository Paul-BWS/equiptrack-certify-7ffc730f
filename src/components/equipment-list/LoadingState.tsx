import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="flex justify-center items-center h-48">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};