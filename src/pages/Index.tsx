import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { CustomerSearch } from "@/components/CustomerSearch";
import { CustomerList } from "@/components/CustomerList";
import { Customer } from "@/types/customer";

// Sample data - in a real app, this would come from a backend
const sampleCustomers: Customer[] = [
  {
    id: "1",
    name: "Acme Corp",
    email: "contact@acme.com",
    phone: "123-456-7890",
    address: "123 Main St, City, Country",
  },
  {
    id: "2",
    name: "TechServ Ltd",
    email: "info@techserv.com",
    phone: "098-765-4321",
    address: "456 Tech Ave, City, Country",
  },
];

const Index = () => {
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [searchQuery, setSearchQuery] = useState("");

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
          </div>

          <div className="mb-8">
            <CustomerSearch onSearch={setSearchQuery} />
          </div>

          <CustomerList customers={filteredCustomers} />
        </div>
      </main>
    </div>
  );
};

export default Index;