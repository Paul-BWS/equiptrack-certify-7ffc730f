import { Navigation } from "@/components/Navigation";

export const SettingsLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    </div>
  );
};