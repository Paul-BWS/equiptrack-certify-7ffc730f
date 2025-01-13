import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { CompanyCard } from "@/components/customer-dashboard/CompanyCard";
import { ContactsList } from "@/components/customer-dashboard/ContactsList";
import { EquipmentServiceList } from "@/components/customer-dashboard/EquipmentServiceList";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CustomerDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: company, isLoading: isLoadingCompany } = useQuery({
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
    enabled: !!id,
  });

  if (isLoadingCompany) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
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
      <div className="bg-[#1EAEDB]">
        <div className="container mx-auto py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-white hover:text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-white">Company</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-6 space-y-6">
        <CompanyCard company={company} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactsList contacts={company.contacts || []} companyId={company.id} />
          <EquipmentServiceList companyId={company.id} />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;