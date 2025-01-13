import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { UserCompany } from "@/types/admin";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";

interface UserAssociationsTableProps {
  userCompanies: UserCompany[] | undefined;
  companies: { id: string; name: string; }[];
  isLoading: boolean;
  onAssociationRemoved: () => void;
  onAssociationAdded: () => void;
}

// Define the type for user group data
interface UserGroup {
  id: string;
  user_id: string;
  group_id: string;
  company_groups: {
    name: string;
  } | null;
}

export const UserAssociationsTable = ({
  userCompanies,
  companies,
  isLoading,
  onAssociationRemoved,
  onAssociationAdded,
}: UserAssociationsTableProps) => {
  const { toast } = useToast();
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");

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

  // Fetch user group associations with proper typing
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
      return data as UserGroup[];
    },
  });

  const handleAddCompanyAssociation = async () => {
    if (!selectedCompany || !selectedUser) {
      toast({
        title: "Error",
        description: "Please select both a user and a company",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('user_companies')
        .insert([
          {
            user_id: selectedUser,
            company_id: selectedCompany,
          }
        ]);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "User-company association has been added",
      });
      
      onAssociationAdded();
      setSelectedCompany("");
      setSelectedUser("");
    } catch (error) {
      console.error('Error adding association:', error);
      toast({
        title: "Error",
        description: "Failed to add association",
        variant: "destructive",
      });
    }
  };

  const handleAddGroupAssociation = async () => {
    if (!selectedGroup || !selectedUser) {
      toast({
        title: "Error",
        description: "Please select both a user and a group",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('user_company_groups')
        .insert([
          {
            user_id: selectedUser,
            group_id: selectedGroup,
          }
        ]);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "User-group association has been added",
      });
      
      refetchUserGroups();
      setSelectedGroup("");
      setSelectedUser("");
    } catch (error) {
      console.error('Error adding group association:', error);
      toast({
        title: "Error",
        description: "Failed to add group association",
        variant: "destructive",
      });
    }
  };

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
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-medium">Add New Company Association</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueUsers?.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={handleAddCompanyAssociation}>
                Add Association
              </Button>
            </div>
          </div>

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
                          
                          onAssociationRemoved();
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
        </TabsContent>

        <TabsContent value="groups">
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-medium">Add New Group Association</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueUsers?.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  {groups?.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={handleAddGroupAssociation}>
                Add Group Association
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Email</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userGroups?.map((ug) => (
                <TableRow key={ug.id}>
                  <TableCell>
                    {uniqueUsers?.find(u => u.id === ug.user_id)?.email}
                  </TableCell>
                  <TableCell>{ug.company_groups?.name || 'N/A'}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={async () => {
                        try {
                          const { error } = await supabase
                            .from('user_company_groups')
                            .delete()
                            .eq('id', ug.id);
                          
                          if (error) throw error;
                          
                          toast({
                            title: "Group association removed",
                            description: "User-group association has been removed",
                          });
                          
                          refetchUserGroups();
                        } catch (error) {
                          console.error('Error removing group association:', error);
                          toast({
                            title: "Error",
                            description: "Failed to remove group association",
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
        </TabsContent>
      </Tabs>
    </div>
  );
};
