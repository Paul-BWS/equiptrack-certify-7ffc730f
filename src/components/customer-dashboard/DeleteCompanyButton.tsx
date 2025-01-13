import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface DeleteCompanyButtonProps {
  companyId: string;
  companyName: string;
}

export const DeleteCompanyButton = ({ companyId, companyName }: DeleteCompanyButtonProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteCompany, isPending } = useMutation({
    mutationFn: async () => {
      console.log("Starting company deletion for ID:", companyId);
      
      // Delete from companies table
      const { error: companiesError } = await supabase
        .from('companies')
        .delete()
        .eq('id', companyId);
      
      if (companiesError) {
        console.error("Error deleting from companies:", companiesError);
        throw companiesError;
      }
      
      console.log("Company deletion successful");
    },
    onSuccess: () => {
      // Immediately remove the company from the cache
      queryClient.setQueryData(['companies'], (oldData: any) => {
        if (!oldData) return [];
        const newData = oldData.filter((company: any) => company.id !== companyId);
        console.log('Updated cache:', newData);
        return newData;
      });
      
      // Then invalidate the queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      queryClient.removeQueries({ queryKey: ['company', companyId] });
      
      toast({
        title: "Success",
        description: "Company has been deleted successfully",
      });
      
      console.log("Cache invalidated, navigating to home");
      navigate('/');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete company",
        variant: "destructive",
      });
      console.error("Error in delete mutation:", error);
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white hover:bg-white/90 border-[#0EA5E9] text-[#0EA5E9] hover:text-[#0EA5E9]"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {companyName} and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteCompany()}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};