import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { UserCompany } from "@/types/admin";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyAssociationsForm } from "./associations/CompanyAssociationsForm";
import { GroupAssociationsForm } from "./associations/GroupAssociationsForm";
import { CompanyAssociationsTable } from "./associations/CompanyAssociationsTable";
import { GroupAssociationsTable } from "./associations/GroupAssociationsTable";

interface UserAssociationsTableProps {
  userCompanies: UserCompany[] | undefined;
  companies: { id: string; name: string; }[];
  isLoading: boolean;
  onAssociationRemoved: () => void;
  onAssociationAdded: () => void;
}

export const UserAssociationsTable = ({
  userCompanies,
  companies,
  isLoading,
  onAssociationRemoved,
  onAssociationAdded,
}: UserAssociationsTableProps) => {
  const { toast } = useToast();

  const { data: groups } = useQuery({
    queryKey: ['company-groups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('company_groups')
        .select('id, name');
      
      if (error) {
        console.error('Error fetching groups:', error);
        toast({
          title: "Error fetching groups",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
      return data;
    },
  });

  const { data: userGroups, refetch: refetchUserGroups } = useQuery({
    queryKey: ['user-groups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_company_groups')
        .select(`
          id,
          user_id,
          group_id,
          company_groups (
            name
          )
        `);
      
      if (error) {
        console.error('Error fetching user groups:', error);
        toast({
          title: "Error fetching user groups",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
      
      return (data || []).map(group => ({
        id: group.id,
        user_id: group.user_id,
        group_id: group.group_id,
        company_groups: {
          name: group.company_groups?.name || 'N/A'
        }
      }));
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const uniqueUsers = userCompanies?.reduce((acc: { id: string; email: string }[], current) => {
    if (!acc.find(user => user.id === current.user_id)) {
      acc.push({
        id: current.user_id,
        email: current.user_email
      });
    }
    return acc;
  }, []);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="companies" className="w-full">
        <TabsList>
          <TabsTrigger value="companies">Company Associations</TabsTrigger>
          <TabsTrigger value="groups">Group Associations</TabsTrigger>
        </TabsList>

        <TabsContent value="companies">
          <CompanyAssociationsForm
            uniqueUsers={uniqueUsers}
            companies={companies}
            onAssociationAdded={onAssociationAdded}
          />
          <CompanyAssociationsTable
            userCompanies={userCompanies}
            onAssociationRemoved={onAssociationRemoved}
          />
        </TabsContent>

        <TabsContent value="groups">
          <GroupAssociationsForm
            uniqueUsers={uniqueUsers}
            groups={groups}
            onAssociationAdded={refetchUserGroups}
          />
          <GroupAssociationsTable
            userGroups={userGroups}
            uniqueUsers={uniqueUsers}
            onAssociationRemoved={refetchUserGroups}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};