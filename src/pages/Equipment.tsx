import { Navigation } from "@/components/Navigation";
import { EquipmentCategories } from "@/components/EquipmentCategories";

const Equipment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto py-8">
        <EquipmentCategories />
      </main>
    </div>
  );
};

export default Equipment;