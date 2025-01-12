import { CustomerSearch } from "@/components/CustomerSearch";
import { CustomerList } from "@/components/CustomerList";
import { CustomerForm } from "@/components/CustomerForm";
import { Loader2 } from "lucide-react";
import { Company } from "@/types/company";

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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Companies
          </h1>
          <p className="text-gray-500">Manage your company relationships</p>
        </div>
        <CustomerForm />
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