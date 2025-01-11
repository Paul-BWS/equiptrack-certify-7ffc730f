import { Button } from "@/components/ui/button";
import { Company } from "@/types/company";
import { ArrowRight, Globe, MapPin, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomerListProps {
  customers: Company[];
}

export const CustomerList = ({ customers }: CustomerListProps) => {
  const navigate = useNavigate();

  const openInGoogleMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const handleCustomerClick = (customerId: string) => {
    navigate(`/customers/${customerId}`);
  };

  return (
    <div className="space-y-4">
      {customers.map((company) => (
        <div
          key={company.id}
          className="flex items-center justify-between p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900">{company.name}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <span className="text-gray-600">{company.industry}</span>
              </div>
              {company.website && (
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <a 
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary"
                  >
                    {company.website}
                  </a>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div 
                className="bg-blue-50 p-2 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                onClick={() => openInGoogleMaps(company.address)}
                title="Open in Google Maps"
              >
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <span 
                className="text-gray-600 cursor-pointer hover:text-primary"
                onClick={() => openInGoogleMaps(company.address)}
              >
                {company.address}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-primary hover:bg-primary/90 h-10 w-10 p-0"
            onClick={() => handleCustomerClick(company.id)}
          >
            <ArrowRight className="h-4 w-4 text-primary-foreground" />
          </Button>
        </div>
      ))}
    </div>
  );
};