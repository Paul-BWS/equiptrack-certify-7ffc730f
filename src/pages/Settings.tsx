import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";
import { getOrganizationSettings, updateOrganizationSettings } from "@/utils/settings";
import { CompanyInformationForm } from "@/components/settings/CompanyInformationForm";
import { MediaUploadForm } from "@/components/settings/MediaUploadForm";

export default function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(getOrganizationSettings());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Auth check error:", error);
        toast("Authentication error");
        navigate('/');
        return;
      }
      
      if (!session) {
        console.log("No active session found");
        toast("Please sign in to access settings");
        navigate('/');
        return;
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleSave = () => {
    updateOrganizationSettings(settings);
    toast("Settings saved successfully");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Organization Settings</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="grid gap-6">
          <CompanyInformationForm settings={settings} setSettings={setSettings} />
          <MediaUploadForm settings={settings} setSettings={setSettings} />

          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Settings</Button>
          </div>
        </div>
      </div>
    </div>
  );
}