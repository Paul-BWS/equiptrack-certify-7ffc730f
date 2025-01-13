import { Navigation } from "@/components/Navigation";
import { EquipmentCategories } from "@/components/EquipmentCategories";

const Equipment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto py-8">
        <div className="mb-8">
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