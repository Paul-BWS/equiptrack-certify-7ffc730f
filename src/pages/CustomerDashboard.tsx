import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { DashboardHeader } from "@/components/customer-dashboard/DashboardHeader";
import { DashboardContent } from "@/components/customer-dashboard/DashboardContent";
import { LoadingState } from "@/components/customer-dashboard/LoadingState";
import { useMediaQuery } from "@/hooks/use-mobile";

const CustomerDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 768px)");

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

  const { data: company, isLoading: isLoadingCompany } = useQuery({
    queryKey: ['company', id],
    queryFn: async () => {
      if (!id || id === 'undefined') {
        throw new Error('Invalid customer ID');
      }

      const { data, error } = await supabase
        .from('companies')
        .select('*, contacts(*)')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching company:', error);
        toast({
          title: "Error",
          description: "Failed to fetch company data",
          variant: "destructive",
        });
        throw error;
      }

      if (!data) {
        toast({
          title: "Not Found",
          description: "Company not found",
          variant: "destructive",
        });
        throw new Error('Company not found');
      }

      return data;
    },
    enabled: !!id && id !== 'undefined',
  });

  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-screen p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Desktop Only View</h1>
          <p className="text-gray-600">
            This dashboard is optimized for desktop viewing. Please access it from a larger screen.
          </p>
        </div>
      </div>
    );
  }

  if (isLoadingCompany) {
    return <LoadingState />;
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
