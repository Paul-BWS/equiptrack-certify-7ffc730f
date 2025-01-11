import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Grid, Mail, Phone, ArrowRight, Globe, Building2, Factory } from "lucide-react";
import { Customer } from "@/types/customer";
import { Equipment } from "@/types/equipment";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { CustomerEditForm } from "@/components/CustomerEditForm";

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

  const { data: customer, isLoading } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', customerId)
        .single();
      
      if (error) {
        throw error;
      }
      
      return data as Customer;
    }
  });

  if (isLoading) {
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

  if (!customer) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto py-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Customer not found</h2>
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
                {customer.name}
              </CardTitle>
              <CustomerEditForm customer={customer} />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs text-[#B3B3B3] mb-1 flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Company
                    </h3>
                    <p className="text-sm">{customer.company}</p>
                  </div>
                  <div>
                    <h3 className="text-xs text-[#B3B3B3] mb-1 flex items-center gap-2">
                      <Factory className="h-4 w-4" />
                      Industry
                    </h3>
                    <p className="text-sm">{customer.industry}</p>
                  </div>
                  <div>
                    <h3 className="text-xs text-[#B3B3B3] mb-1 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </h3>
                    <p className="text-sm">{customer.email}</p>
                  </div>
                  <div>
                    <h3 className="text-xs text-[#B3B3B3] mb-1 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </h3>
                    <p className="text-sm">{customer.phone}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs text-[#B3B3B3] mb-1">Site Address</h3>
                    <p className="text-sm">{customer.address}</p>
                  </div>
                  {customer.useSeparateBillingAddress && (
                    <div>
                      <h3 className="text-xs text-[#B3B3B3] mb-1">Billing Address</h3>
                      <p className="text-sm">{customer.billingAddress}</p>
                    </div>
                  )}
                  {customer.website && (
                    <div>
                      <h3 className="text-xs text-[#B3B3B3] mb-1 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Website
                      </h3>
                      <a 
                        href={customer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {customer.website}
                      </a>
                    </div>
                  )}
                  {customer.notes && (
                    <div>
                      <h3 className="text-xs text-[#B3B3B3] mb-1">Notes</h3>
                      <p className="text-sm whitespace-pre-wrap">{customer.notes}</p>
                    </div>
                  )}
                </div>
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