import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const LoadingState = () => {
  return (
    <Card className="bg-white border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Equipment Due for Service
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </CardContent>
    </Card>
  );
};