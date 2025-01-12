import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";
import { getOrganizationSettings, updateOrganizationSettings } from "@/utils/settings";
import { CompanyInformationForm } from "@/components/settings/CompanyInformationForm";
import { MediaUploadForm } from "@/components/settings/MediaUploadForm";
import { StaffManagement } from "@/components/settings/StaffManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { SettingsLoading } from "@/components/settings/SettingsLoading";

export default function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(getOrganizationSettings());
  const { isLoading, isAuthorized } = useAuthCheck();

  const handleSave = () => {
    updateOrganizationSettings(settings);
    toast.success("Settings saved successfully");
  };

  if (isLoading || !isAuthorized) {
    return <SettingsLoading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <Tabs defaultValue="company" className="space-y-6">
          <TabsList>
            <TabsTrigger value="company">Company Information</TabsTrigger>
            <TabsTrigger value="staff">Staff Management</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-6">
            <CompanyInformationForm settings={settings} setSettings={setSettings} />
            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Settings</Button>
            </div>
          </TabsContent>

          <TabsContent value="staff">
            <StaffManagement />
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <MediaUploadForm settings={settings} setSettings={setSettings} />
            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Settings</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}