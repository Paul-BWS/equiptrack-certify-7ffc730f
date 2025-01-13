import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Users, Grid } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { CompanyCard } from "@/components/customer-dashboard/CompanyCard";
import { ContactsList } from "@/components/customer-dashboard/ContactsList";
import { EquipmentServiceList } from "@/components/customer-dashboard/EquipmentServiceList";

const CustomerDashboard = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  console.log("Customer ID from params:", customerId);

  const { data: company, isLoading: isLoadingCompany, error: companyError } = useQuery({
    queryKey: ['company', customerId],
    queryFn: async () => {
      console.log("Fetching company data for ID:", customerId);
      const { data, error } = await supabase
        .from('companies')
        .select()
        .eq('id', customerId)
        .single();
      
      if (error) {
        console.error("Supabase error fetching company:", error);
        throw error;
      }
      if (!data) {
        console.error("No company data found for ID:", customerId);
        throw new Error('Company not found');
      }
      
      console.log("Company data retrieved:", data);
      return data;
    },
    meta: {
      onError: (error: Error) => {
        console.error("Query error:", error);
        toast({
          title: "Error",
          description: "Could not load company details. Please try again later.",
          variant: "destructive",
        });
      }
    }
  });

  const { data: contacts, isLoading: isLoadingContacts, error: contactsError } = useQuery({
    queryKey: ['contacts', customerId],
    queryFn: async () => {
      console.log("Fetching contacts for company ID:", customerId);
      const { data, error } = await supabase
        .from('contacts')
        .select()
        .eq('company_id', customerId)
        .order('is_primary', { ascending: false });
      
      if (error) {
        console.error("Supabase error fetching contacts:", error);
        throw error;
      }
      console.log("Contacts retrieved:", data);
      return data;
    },
    enabled: !!company,
    meta: {
      onError: (error: Error) => {
        console.error("Query error:", error);
        toast({
          title: "Error",
          description: "Could not load contacts. Please try again later.",
          variant: "destructive",
        });
      }
    }
  });

  if (isLoadingCompany || isLoadingContacts) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto py-8">
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  if (companyError || !company) {
    console.error("Rendering error state. Error:", companyError);
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto py-8">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Company not found</h2>
            <Button onClick={() => navigate('/')}>
              Return to Dashboard
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant="outline"
            size="icon"
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate('/')}
          >
            <Users className="h-4 w-4 text-primary-foreground" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate(`/customers/${customerId}/equipment`)}
          >
            <Grid className="h-4 w-4 text-primary-foreground" />
          </Button>
        </div>

        <div className="space-y-6">
          <CompanyCard company={company} />
          <ContactsList contacts={contacts} companyId={customerId!} />
          <EquipmentServiceList companyId={customerId!} />
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;