import { Card, CardContent } from "@/components/ui/card";

export const LoadingSpinner = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </CardContent>
    </Card>
  );
};