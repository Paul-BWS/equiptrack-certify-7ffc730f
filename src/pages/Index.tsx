import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { LoadingScreen } from "@/components/auth/LoadingScreen";
import { ErrorScreen } from "@/components/auth/ErrorScreen";
import { AuthenticationScreen } from "@/components/auth/AuthenticationScreen";
import { CompanyDashboard } from "@/components/dashboard/CompanyDashboard";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const { isAuthorized } = useAuthCheck();

  const { data: session, isLoading: isSessionLoading, error: sessionError } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        setAuthError(error.message);
        return null;
      }
      return session;
    },
  });

  const { data: companies = [], isLoading: isLoadingCompanies } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      console.log('Fetching companies...');
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching companies:', error);
        throw error;
      }
      
      console.log('Companies fetched:', data);
      return data;
    },
    enabled: !!session,
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching companies:', error);
        toast.error("Failed to load companies");
      }
    }
  });

  const handleTestEmail = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('send-reminder-email', {
        body: { test: true }
      });

      if (error) {
        console.error('Error sending test email:', error);
        toast.error("Failed to send test email");
        return;
      }

      toast.success("Test email sent successfully!");
    } catch (error) {
      console.error('Error:', error);
      toast.error("An error occurred while sending the test email");
    }
  };

  if (isSessionLoading) {
    return <LoadingScreen />;
  }

  if (sessionError || authError) {
    return <ErrorScreen message={sessionError?.message || authError || "Authentication error occurred"} />;
  }

  if (!session) {
    return <AuthenticationScreen />;
  }

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto py-8 px-4">
        {isAuthorized && (
          <div className="mb-4">
            <Button 
              onClick={handleTestEmail}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Send Test Email
            </Button>
          </div>
        )}
        <CompanyDashboard
          companies={filteredCompanies}
          isLoading={isLoadingCompanies}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
        />
      </main>
    </div>
  );
};

export default Index;