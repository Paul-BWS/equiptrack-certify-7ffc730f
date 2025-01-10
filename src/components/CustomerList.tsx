import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer";
import { ArrowRight } from "lucide-react";
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
          <div>
            <h3 className="font-medium">{customer.name}</h3>
            <p className="text-sm text-muted-foreground">{customer.email}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/customers/${customer.id}`)}
          >
            <ArrowRight className="h-4 w-4" />
            View Details
          </Button>
        </div>
      ))}
    </div>
  );
};