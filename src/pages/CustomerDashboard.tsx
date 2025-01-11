import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowRight, Mail, Phone, Eye } from "lucide-react";
import { Customer } from "@/types/customer";
import { Equipment } from "@/types/equipment";

// Sample data - in a real app, this would come from your backend
const sampleCustomer: Customer = {
  id: "1",
  name: "Acme Corp",
  email: "contact@acme.com",
  phone: "123-456-7890",
  address: "123 Main St, City, Country",
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
        <Button
          variant="outline"
          size="icon"
          className="mb-6 bg-primary hover:bg-primary/90"
          onClick={() => navigate('/')}
        >
          <Users className="h-4 w-4 text-primary-foreground" />
        </Button>

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
              <div className="pt-4">
                <Button
                  onClick={() => navigate(`/customers/${customerId}/equipment`)}
                  className="w-full md:w-auto bg-primary hover:bg-primary/90"
                >
                  View All Equipment
                  <ArrowRight className="ml-2 h-4 w-4 text-primary-foreground" />
                </Button>
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
                      variant="outline"
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
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