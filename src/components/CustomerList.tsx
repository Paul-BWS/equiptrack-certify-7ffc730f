import { Company } from "@/types/company";
import { Building2, Globe, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomerListProps {
  customers: Company[];
}

export const CustomerList = ({ customers }: CustomerListProps) => {
  const navigate = useNavigate();

  const formatAddress = (customer: Company) => {
    const parts = [
      customer.address1,
      customer.address2,
      customer.city,
      customer.state,
      customer.postcode,
      customer.country
    ].filter(Boolean);
    return parts.join(", ");
  };

  const openInGoogleMaps = (customer: Company) => {
    const address = formatAddress(customer);
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
          className="p-6 rounded-xl border border-gray-100 bg-white hover:shadow-lg transition-all duration-200"
        >
          <div className="space-y-3">
            <button
              onClick={() => handleCustomerClick(company.id)}
              className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors text-left w-full"
            >
              {company.name}
            </button>
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
                onClick={() => openInGoogleMaps(company)}
                title="Open in Google Maps"
              >
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <span 
                className="text-gray-600 cursor-pointer hover:text-primary"
                onClick={() => openInGoogleMaps(company)}
              >
                {formatAddress(company)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};