import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { CustomerSearch } from "@/components/CustomerSearch";
import { CustomerList } from "@/components/CustomerList";
import { CustomerForm } from "@/components/CustomerForm";
import { Customer } from "@/types/customer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      return data as Customer[];
    }
  });

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Customers
              </h1>
              <p className="text-gray-500">Manage your customer relationships</p>
            </div>
            <CustomerForm />
          </div>

          <div className="mb-8">
            <CustomerSearch onSearch={setSearchQuery} />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <CustomerList customers={filteredCustomers} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;