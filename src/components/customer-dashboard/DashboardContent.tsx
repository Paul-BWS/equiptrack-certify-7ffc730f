import { CompanyCard } from "./CompanyCard";
import { EquipmentServiceList } from "./EquipmentServiceList";
import { Company } from "@/types/company";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WrenchIcon } from "lucide-react";

interface DashboardContentProps {
  company: Company;
}

export const DashboardContent = ({ company }: DashboardContentProps) => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Promotional Banner */}
      <a 
        href="https://www.basicwelding.co.uk/torque-wrenches" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        <Card className="bg-blue-50 hover:bg-blue-100 transition-colors">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-blue-900">Looking for a New Torque Wrench?</h3>
              <p className="text-blue-700">
                Explore our professional range of torque wrenches at competitive prices
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <WrenchIcon className="mr-2 h-4 w-4" />
              Shop Now
            </Button>
          </CardContent>
        </Card>
      </a>

      <CompanyCard company={company} />
      <EquipmentServiceList companyId={company.id} />

      {/* Support Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">Need Technical Support?</h3>
              <p className="text-gray-600">
                Our engineers are ready to help with any equipment issues
              </p>
            </div>
            <Button 
              onClick={() => window.location.href = 'mailto:support@basicwelding.co.uk'}
              className="bg-primary hover:bg-primary/90"
            >
              Request Engineer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};