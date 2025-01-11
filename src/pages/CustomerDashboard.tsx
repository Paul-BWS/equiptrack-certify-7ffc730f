import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Grid, Mail, Phone, ArrowRight, Globe, Building2, Factory, UserPlus, Pencil } from "lucide-react";
import { Company } from "@/types/company";
import { Contact } from "@/types/contact";
import { Equipment } from "@/types/equipment";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { CompanyEditForm } from "@/components/CompanyEditForm";
import { ContactForm } from "@/components/ContactForm";
import { useToast } from "@/components/ui/use-toast";

const sampleUpcomingService: Equipment[] = [
  {
    id: "1",
    name: "Torque Wrench XL",
    serialNumber: "TW-001",
    manufacturer: "TorcPro",
    model: "TP-100",
    purchaseDate: "2023-01-15",
    lastServiceDate: "2023-06-15",
    nextServiceDue: "2024-06-15",
  },
  {
    id: "2",
    name: "Pressure Gauge",
    serialNumber: "PG-002",
    manufacturer: "PressureTech",
    model: "PT-200",
    purchaseDate: "2023-02-20",
    lastServiceDate: "2023-07-20",
    nextServiceDue: "2024-05-20",
  },
];

const CustomerDashboard = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: company, isLoading: isLoadingCompany, error: companyError } = useQuery({
    queryKey: ['company', customerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select()
        .eq('id', customerId)
        .single();
      
      if (error) throw error;
      if (!data) {
        throw new Error('Company not found');
      }
      
      return data as Company;
    },
    meta: {
      onError: () => {
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
      const { data, error } = await supabase
        .from('contacts')
        .select()
        .eq('company_id', customerId)
        .order('is_primary', { ascending: false });
      
      if (error) throw error;
      return data as Contact[];
    },
    enabled: !!company,
    meta: {
      onError: () => {
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                {company.name}
              </CardTitle>
              <div className="flex gap-2">
                <ContactForm companyId={company.id} />
                <CompanyEditForm company={company} />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs text-[#B3B3B3] mb-1 flex items-center gap-2">
                      <Factory className="h-4 w-4" />
                      Industry
                    </h3>
                    <p className="text-sm">{company.industry}</p>
                  </div>
                  {company.website && (
                    <div>
                      <h3 className="text-xs text-[#B3B3B3] mb-1 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Website
                      </h3>
                      <a 
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {company.website}
                      </a>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs text-[#B3B3B3] mb-1">Site Address</h3>
                    <p className="text-sm">{company.address}</p>
                  </div>
                  {company.useSeparateBillingAddress && (
                    <div>
                      <h3 className="text-xs text-[#B3B3B3] mb-1">Billing Address</h3>
                      <p className="text-sm">{company.billingaddress}</p>
                    </div>
                  )}
                  {company.notes && (
                    <div>
                      <h3 className="text-xs text-[#B3B3B3] mb-1">Notes</h3>
                      <p className="text-sm whitespace-pre-wrap">{company.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold">Contacts</CardTitle>
              <ContactForm companyId={customerId!} />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contacts?.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-[#F9F9F9]"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">
                          {contact.name}
                          {contact.is_primary && (
                            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              Primary Contact
                            </span>
                          )}
                        </h3>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {contact.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {contact.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Equipment Due for Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleUpcomingService.map((equipment) => (
                  <div
                    key={equipment.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-[#F9F9F9]"
                  >
                    <div>
                      <h3 className="font-medium text-sm">{equipment.name}</h3>
                      <p className="text-xs text-[#B3B3B3]">
                        Next Service: {equipment.nextServiceDue}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-primary hover:bg-primary/90 h-10 w-10 p-0"
                      onClick={() =>
                        navigate(`/customers/${customerId}/equipment`)
                      }
                    >
                      <ArrowRight className="h-4 w-4 text-primary-foreground" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
