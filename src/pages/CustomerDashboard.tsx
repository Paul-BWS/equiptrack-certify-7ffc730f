import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/customer-dashboard/DashboardHeader";
import { DashboardContent } from "@/components/customer-dashboard/DashboardContent";
import { LoadingState } from "@/components/customer-dashboard/LoadingState";
import { AuthenticationScreen } from "@/components/auth/AuthenticationScreen";
import { ErrorScreen } from "@/components/auth/ErrorScreen";
import { useProfileData } from "@/hooks/useProfileData";

const CustomerDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isBWSUser } = useProfileData();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!id || id === 'undefined') {
      toast({
        title: "Error",
        description: "Invalid customer ID",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
  }, [id, navigate, toast]);

  const { data: company, isLoading, error } = useQuery({
    queryKey: ['company', id],
    queryFn: async () => {
      if (!id || id === 'undefined') {
        throw new Error('Invalid customer ID');
      }

      console.log('Fetching company data...');
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('*, contacts(*)')
          .eq('id', id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching company:', error);
          throw error;
        }

        if (!data) {
          throw new Error('Company not found');
        }

        // Check if user has access to this company
        if (!isBWSUser) {
          const { data: userCompany, error: accessError } = await supabase
            .from('user_companies')
            .select('company_id')
            .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
            .eq('company_id', id)
            .maybeSingle();

          if (accessError) {
            console.error('Error checking company access:', accessError);
            throw new Error('Error verifying access permissions');
          }

          if (!userCompany) {
            throw new Error('Access denied');
          }
        }

        console.log('Company data fetched:', data);
        return data;
      } catch (err) {
        console.error('Error in company fetch:', err);
        throw err;
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!id && id !== 'undefined' && isAuthenticated,
  });

  if (!isAuthenticated) {
    return <AuthenticationScreen />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Failed to load company data. Please try again later.";
    
    console.error('Detailed error:', error);
    
    return <ErrorScreen message={errorMessage} />;
  }

  if (!company) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-lg text-muted-foreground">Company not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader id={company.id} />
      <DashboardContent company={company} />
    </div>
  );
};

export default CustomerDashboard;