import { Navigation } from "@/components/Navigation";
import { CustomerEquipmentList } from "@/components/customer-equipment/CustomerEquipmentList";
import { EquipmentList } from "@/components/EquipmentList";
import { useProfileData } from "@/hooks/useProfileData";
import { LoadingScreen } from "@/components/auth/LoadingScreen";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const Equipment = () => {
  const { isBWSUser, isLoading } = useProfileData();

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*, companies:company_id(*)')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

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
          <CustomerEquipmentList companyId={profile?.company_id} />
        )}
      </main>
    </div>
  );
};

export default Equipment;