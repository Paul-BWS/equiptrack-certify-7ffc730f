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
import { StaffManagement } from "@/components/settings/StaffManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(getOrganizationSettings());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Auth check error:", sessionError);
          toast.error("Authentication error");
          navigate('/');
          return;
        }
        
        if (!session) {
          console.log("No active session found");
          toast.error("Please sign in to access settings");
          navigate('/');
          return;
        }

        // First get the user's profile to get their company_id
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('company_id')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
          toast.error("Error fetching user profile");
          return;
        }

        if (!profileData?.company_id) {
          console.log("No company associated with user");
          toast.error("No company associated with your account");
          return;
        }

        // Then get the company details
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .select('name')
          .eq('id', profileData.company_id)
          .single();

        if (companyError) {
          console.error("Company fetch error:", companyError);
          toast.error("Error fetching company details");
          return;
        }

        if (companyData?.name !== 'BWS') {
          toast.error("You don't have permission to access settings");
          navigate('/');
          return;
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSave = () => {
    updateOrganizationSettings(settings);
    toast.success("Settings saved successfully");
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