import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface GroupAssociationsTableProps {
  userGroups: {
    id: string;
    user_id: string;
    group_id: string;
    company_groups: {
      name: string;
    } | null;
  }[] | undefined;
  uniqueUsers: { id: string; email: string; }[] | undefined;
  onAssociationRemoved: () => void;
}

export const GroupAssociationsTable = ({
  userGroups,
  uniqueUsers,
  onAssociationRemoved,
}: GroupAssociationsTableProps) => {
  const { toast } = useToast();

  return (
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
                    
                    onAssociationRemoved();
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
  );
};