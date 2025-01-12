import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { CustomerSearch } from "@/components/CustomerSearch";
import { CustomerList } from "@/components/CustomerList";
import { CustomerForm } from "@/components/CustomerForm";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { toast } from "sonner";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: session, isLoading: isSessionLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const { data: companies = [], isLoading: isLoadingCompanies } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      return data;
    },
    enabled: !!session,
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching companies:', error);
      }
    }
  });

  // Show loading state while checking session
  if (isSessionLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not signed in, show Supabase Auth UI
  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto py-8 px-4">
          <div className="max-w-md mx-auto">
            <Card className="p-6">
              <h1 className="text-2xl font-bold text-center mb-6">Welcome to EquipService</h1>
              <Auth
                supabaseClient={supabase}
                appearance={{ 
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#2563eb',
                        brandAccent: '#1d4ed8',
                      },
                    },
                  },
                }}
                providers={[]}
                redirectTo={window.location.origin}
              />
            </Card>
          </div>
        </main>
      </div>
    );
  }

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto py-8 px-4">
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
            <CustomerSearch onSearch={setSearchQuery} />
          </div>

          {isLoadingCompanies ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <CustomerList customers={filteredCompanies} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;