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
  const [isInviting, setIsInviting] = useState(false);

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

  const handleSendInvitation = async () => {
    try {
      setIsInviting(true);
      const { data, error } = await supabase.functions.invoke('send-invitation-email', {
        body: { email: 'jason@basicwelding.co.uk' }
      });

      if (error) {
        console.error('Error sending invitation:', error);
        toast.error("Failed to send invitation email");
        return;
      }

      toast.success("Invitation email sent successfully!");
    } catch (error) {
      console.error('Error:', error);
      toast.error("An error occurred while sending the invitation email");
    } finally {
      setIsInviting(false);
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
          <div className="mb-4 space-y-4">
            <Button 
              onClick={handleSendInvitation}
              className="bg-green-500 hover:bg-green-600 text-white ml-4"
              disabled={isInviting}
            >
              {isInviting ? "Sending Invitation..." : "Send Invitation to Jason"}
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