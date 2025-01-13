import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAssociationsTable } from "@/components/admin/UserAssociationsTable";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { UserCompany } from "@/types/admin";
import { useQuery } from "@tanstack/react-query";

const AdminUsers = () => {
  const { isLoading: authLoading, isAuthorized } = useAuthCheck();
  const { toast } = useToast();

  const { data: userCompanies, isLoading: isLoadingUsers, refetch: refetchUsers } = useQuery({
    queryKey: ['user-companies'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_user_data');
      
      if (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error fetching users",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data as UserCompany[];
    },
  });

  const { data: companies, isLoading: isLoadingCompanies } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('id, name');
      
      if (error) {
        console.error('Error fetching companies:', error);
        toast({
          title: "Error fetching companies",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data;
    },
  });

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <div>Not authorized</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Associations</CardTitle>
            </CardHeader>
            <CardContent>
              <UserAssociationsTable
                userCompanies={userCompanies}
                companies={companies || []}
                isLoading={isLoadingUsers || isLoadingCompanies}
                onAssociationRemoved={refetchUsers}
                onAssociationAdded={refetchUsers}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminUsers;