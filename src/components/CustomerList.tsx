import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomerListProps {
  customers: Customer[];
}

export const CustomerList = ({ customers }: CustomerListProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {customers.map((customer) => (
        <div
          key={customer.id}
          className="flex items-center justify-between p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900">{customer.name}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <span className="text-gray-600">{customer.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <span className="text-gray-600">{customer.phone}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <span className="text-gray-600">{customer.address}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-primary hover:bg-primary/90 h-10 w-10 p-0"
            onClick={() => navigate(`/customers/${customer.id}`)}
          >
            <ArrowRight className="h-4 w-4 text-primary-foreground" />
          </Button>
        </div>
      ))}
    </div>
  );
};