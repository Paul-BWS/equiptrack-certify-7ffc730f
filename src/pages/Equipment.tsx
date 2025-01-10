import { Navigation } from "@/components/Navigation";
import { EquipmentCategories } from "@/components/EquipmentCategories";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const Equipment = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto py-8">
        <div className="mb-8">
          <Button
            variant="outline"
            className="mb-4"
            onClick={() => navigate(`/customers/${customerId}`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Customer
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Equipment Categories
          </h1>
          <p className="text-muted-foreground">
            Select an equipment category to view or add items
          </p>
        </div>

        <EquipmentCategories />
      </main>
    </div>
  );
};

export default Equipment;