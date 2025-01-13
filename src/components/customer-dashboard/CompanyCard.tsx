import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Factory, Globe, Trash2 } from "lucide-react";
import { Company } from "@/types/company";
import { CompanyEditForm } from "@/components/CompanyEditForm";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteCompany, isPending } = useMutation({
    mutationFn: async () => {
      console.log("Deleting company:", company.id);
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', company.id);
      
      if (error) {
        console.error("Error deleting company:", error);
        throw error;
      }
      
      console.log("Company deleted successfully");
    },
    onSuccess: () => {
      // Invalidate both the companies list and the specific company query
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      queryClient.invalidateQueries({ queryKey: ['company', company.id] });
      toast({
        title: "Success",
        description: "Company has been deleted successfully",
      });
      navigate('/');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete company",
        variant: "destructive",
      });
      console.error("Error deleting company:", error);
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">
          {company.name}
        </CardTitle>
        <div className="flex gap-2">
          <ContactForm companyId={company.id} />
          <CompanyEditForm company={company} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon" className="hover:bg-destructive/90 hover:text-destructive-foreground">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete {company.name} and all associated data.
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
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xs text-[#B3B3B3] mb-1 flex items-center gap-2">
                <Factory className="h-4 w-4" />
                Industry
              </h3>
              <p className="text-sm">{company.industry}</p>
            </div>
            {company.website && (
              <div>
                <h3 className="text-xs text-[#B3B3B3] mb-1 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </h3>
                <a 
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {company.website}
                </a>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-xs text-[#B3B3B3] mb-1">Site Address</h3>
              <p className="text-sm">{company.address}</p>
            </div>
            {company.useSeparateBillingAddress && (
              <div>
                <h3 className="text-xs text-[#B3B3B3] mb-1">Billing Address</h3>
                <p className="text-sm">{company.billingaddress}</p>
              </div>
            )}
            {company.notes && (
              <div>
                <h3 className="text-xs text-[#B3B3B3] mb-1">Notes</h3>
                <p className="text-sm whitespace-pre-wrap">{company.notes}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};