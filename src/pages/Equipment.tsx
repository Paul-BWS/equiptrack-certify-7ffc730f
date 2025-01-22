import { Navigation } from "@/components/Navigation";
import { CustomerEquipmentList } from "@/components/customer-equipment/CustomerEquipmentList";
import { EquipmentList } from "@/components/EquipmentList";
import { useProfileData } from "@/hooks/useProfileData";
import { LoadingScreen } from "@/components/auth/LoadingScreen";

const Equipment = () => {
  const { isBWSUser, isLoading } = useProfileData();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-8">
        {isBWSUser ? (
          <EquipmentList
            equipment={[]}
            onGenerateCertificate={() => {}}
            onViewReadings={() => {}}
          />
        ) : (
          <CustomerEquipmentList />
        )}
      </main>
    </div>
  );
};

export default Equipment;