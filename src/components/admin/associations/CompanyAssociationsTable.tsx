import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserCompany } from "@/types/admin";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface CompanyAssociationsTableProps {
  userCompanies: UserCompany[] | undefined;
  onAssociationRemoved: () => void;
}

export const CompanyAssociationsTable = ({
  userCompanies,
  onAssociationRemoved,
}: CompanyAssociationsTableProps) => {
  const { toast } = useToast();

  return (
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
  );
};