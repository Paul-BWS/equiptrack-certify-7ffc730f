import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

interface UserCompany {
  user_id: string;
  user_email: string;
  company_id: string;
  company_name: string;
}

const AdminUsers = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is BWS user
  const { data: isBWSUser, isLoading: isCheckingBWSStatus } = useQuery({
    queryKey: ['is-bws-user'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('is_bws_user');
      if (error) throw error;
      return data;
    },
  });

  // Fetch user-company associations
  const { data: userCompanies, isLoading: isLoadingUserCompanies, refetch } = useQuery({
    queryKey: ['user-companies'],
    queryFn: async () => {
      const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();
      if (usersError) throw usersError;

      const { data: companies, error: companiesError } = await supabase
        .from('companies')
        .select('id, name');
      if (companiesError) throw companiesError;

      const { data: associations, error: associationsError } = await supabase
        .from('user_companies')
        .select('*');
      if (associationsError) throw associationsError;

      const userCompanyMap: UserCompany[] = [];
      
      associations?.forEach((assoc) => {
        const user = users.find(u => u.id === assoc.user_id);
        const company = companies?.find(c => c.id === assoc.company_id);
        
        if (user && company) {
          userCompanyMap.push({
            user_id: user.id,
            user_email: user.email || '',
            company_id: company.id,
            company_name: company.name,
          });
        }
      });

      return userCompanyMap;
    },
    enabled: isBWSUser,
  });

  // Redirect if not BWS user
  useEffect(() => {
    if (!isCheckingBWSStatus && !isBWSUser) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [isBWSUser, isCheckingBWSStatus, navigate, toast]);

  if (isCheckingBWSStatus || isLoadingUserCompanies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage User Associations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userCompanies?.map((uc) => (
                    <TableRow key={`${uc.user_id}-${uc.company_id}`}>
                      <TableCell>{uc.user_email}</TableCell>
                      <TableCell>{uc.company_name}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={async () => {
                            try {
                              const { error } = await supabase
                                .from('user_companies')
                                .delete()
                                .eq('user_id', uc.user_id)
                                .eq('company_id', uc.company_id);
                              
                              if (error) throw error;
                              
                              toast({
                                title: "Association removed",
                                description: "User-company association has been removed",
                              });
                              
                              refetch();
                            } catch (error) {
                              console.error('Error removing association:', error);
                              toast({
                                title: "Error",
                                description: "Failed to remove association",
                                variant: "destructive",
                              });
                            }
                          }}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminUsers;