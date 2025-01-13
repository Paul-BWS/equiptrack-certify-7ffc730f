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
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  const handleAddAssociation = async () => {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h3 className="text-lg font-medium">Add New Association</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger>
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              {userCompanies?.map((uc) => (
                <SelectItem key={uc.user_id} value={uc.user_id}>
                  {uc.user_email}
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

          <Button onClick={handleAddAssociation}>
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
    </div>
  );
};