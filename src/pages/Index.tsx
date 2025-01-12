import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { LoadingScreen } from "@/components/auth/LoadingScreen";
import { ErrorScreen } from "@/components/auth/ErrorScreen";
import { AuthenticationScreen } from "@/components/auth/AuthenticationScreen";
import { CompanyDashboard } from "@/components/dashboard/CompanyDashboard";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

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
      const { data, error } = await supabase
        .from('companies')
        .select('*');
      
      if (error) {
        throw error;
      }
      
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

  if (isSessionLoading) {
    return <LoadingScreen />;
  }

  if (sessionError || authError) {
    return <ErrorScreen message={sessionError?.message || authError || "Authentication error occurred"} />;
  }

  // If there's no session, show the authentication screen
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