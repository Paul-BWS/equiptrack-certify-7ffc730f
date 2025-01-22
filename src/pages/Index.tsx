import { useState, useEffect } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<Error | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsAuthLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          setAuthError(error);
          return;
        }
        
        setIsAuthenticated(!!session);
      } catch (error) {
        setAuthError(error as Error);
      } finally {
        setIsAuthLoading(false);
      }
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: companies = [], isLoading: isLoadingCompanies, error: companiesError } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      if (!isAuthenticated) return [];
      
      console.log('Fetching companies...');
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .order('name');
        
        if (error) {
          console.error('Error fetching companies:', error);
          toast.error("Failed to load companies");
          throw error;
        }
        
        console.log('Companies fetched:', data);
        return data || [];
      } catch (error: any) {
        console.error('Error fetching companies:', error);
        toast.error("Failed to load companies");
        throw error;
      }
    },
    enabled: isAuthenticated,
    retry: false
  });

  if (isAuthLoading) {
    return <LoadingScreen />;
  }

  if (authError) {
    return <ErrorScreen message={authError.message || "Authentication error occurred"} />;
  }

  if (!isAuthenticated) {
    return <AuthenticationScreen />;
  }

  if (isLoadingCompanies) {
    return <LoadingScreen />;
  }

  if (companiesError) {
    return <ErrorScreen message="Failed to load companies. Please try again later." />;
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