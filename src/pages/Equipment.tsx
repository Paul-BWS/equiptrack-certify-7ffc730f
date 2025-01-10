import { Navigation } from "@/components/Navigation";
import { EquipmentCategories } from "@/components/EquipmentCategories";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Equipment = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto py-8">
        <div className="mb-8">
          <Button
            variant="outline"
            className="mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Customers
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