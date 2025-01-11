import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer";
import { ArrowRight, Mail, Phone, Eye } from "lucide-react";
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
          className="flex items-center justify-between p-4 rounded-lg border bg-card"
        >
          <div className="space-y-2">
            <h3 className="font-medium">{customer.name}</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{customer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{customer.phone}</span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(`/customers/${customer.id}`)}
          >
            <Eye className="h-4 w-4 text-primary" />
          </Button>
        </div>
      ))}
    </div>
  );
};