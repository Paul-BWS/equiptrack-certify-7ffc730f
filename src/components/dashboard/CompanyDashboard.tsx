import { CustomerSearch } from "@/components/CustomerSearch";
import { CustomerList } from "@/components/CustomerList";
import { CustomerForm } from "@/components/CustomerForm";
import { Loader2, Plus } from "lucide-react";
import { Company } from "@/types/company";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface CompanyDashboardProps {
  companies: Company[];
  isLoading: boolean;
  searchQuery: string;
  onSearch: (query: string) => void;
}

export const CompanyDashboard = ({ 
  companies, 
  isLoading, 
  searchQuery, 
  onSearch 
}: CompanyDashboardProps) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className="mr-2 bg-white hover:bg-white/90 border-[#0EA5E9] text-[#0EA5E9] hover:text-[#0EA5E9] rounded-full"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <CustomerForm />
          </Dialog>
          Companies
        </h1>
      </div>

      <div className="mb-8">
        <CustomerSearch onSearch={onSearch} />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <CustomerList customers={companies} />
      )}
    </div>
  );
};