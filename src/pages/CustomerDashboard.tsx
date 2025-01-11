import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Grid, Mail, Phone, ArrowRight } from "lucide-react";
import { Customer } from "@/types/customer";
import { Equipment } from "@/types/equipment";

const sampleCustomer: Customer = {
  id: "1",
  name: "Acme Corp",
  email: "contact@acme.com",
  phone: "123-456-7890",
  address: "123 Main St, City, Country",
  billingAddress: "456 Finance Ave, City, Country",
  useSeparateBillingAddress: true,
  company: "Acme Corporation",
  website: "https://www.acme.com",
  notes: "Leading manufacturer of innovative products",
  industry: "Manufacturing",
};

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
          {/* Customer Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {sampleCustomer.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs text-[#B3B3B3] mb-1">Email</h3>
                  <p className="text-sm">{sampleCustomer.email}</p>
                </div>
                <div>
                  <h3 className="text-xs text-[#B3B3B3] mb-1">Phone</h3>
                  <p className="text-sm">{sampleCustomer.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-xs text-[#B3B3B3] mb-1">Address</h3>
                  <p className="text-sm">{sampleCustomer.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Service Card */}
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


