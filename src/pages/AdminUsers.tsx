import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAssociationsTable } from "@/components/admin/UserAssociationsTable";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { UserCompany } from "@/types/admin";
import { LoadingScreen } from "@/components/auth/LoadingScreen";
import { ErrorScreen } from "@/components/auth/ErrorScreen";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is a BWS user
  const { data: isBWSUser, isLoading: isCheckingBWS } = useQuery({
    queryKey: ['is-bws-user'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('is_bws_user');
      if (error) {
        console.error('Error checking BWS user status:', error);
        return false;
      }
      return data;
    },
  });

  // Redirect non-BWS users
  useEffect(() => {
    if (!isCheckingBWS && !isBWSUser) {
      toast({
        title: "Access Denied",
        description: "You must be a BWS user to access this page",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [isBWSUser, isCheckingBWS, navigate, toast]);

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
    enabled: !!isBWSUser, // Only fetch if user is BWS user
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
    enabled: !!isBWSUser, // Only fetch if user is BWS user
  });

  if (isCheckingBWS) {
    return <LoadingScreen />;
  }

  if (!isBWSUser) {
    return <ErrorScreen message="You must be a BWS user to access this page" />;
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