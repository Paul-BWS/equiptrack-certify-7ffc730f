import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const CustomerDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data: company, isLoading } = useQuery({
    queryKey: ['company', id],
    queryFn: async () => {
      if (!id) {
        toast({
          title: "Error",
          description: "Company ID is required",
          variant: "destructive",
        });
        throw new Error('Company ID is required');
      }

      console.info('Fetching company data for ID:', id);
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Supabase error fetching company:', error);
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
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <div>
      <h1>{company.name}</h1>
      {/* Add more company details here */}
    </div>
  );
};

export default CustomerDashboard;