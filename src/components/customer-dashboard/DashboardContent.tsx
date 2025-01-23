import { CompanyCard } from "./CompanyCard";
import { EquipmentServiceList } from "./EquipmentServiceList";
import { Company } from "@/types/company";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CustomerEquipmentList } from "../customer-equipment/CustomerEquipmentList";

interface DashboardContentProps {
  company: Company;
}

export const DashboardContent = ({ company }: DashboardContentProps) => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <CompanyCard company={company} />
      
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Input 
            type="search" 
            placeholder="Search equipment..." 
            className="max-w-md"
          />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Date
            </Button>
            <Button variant="outline" size="sm">
              Type
            </Button>
            <Button variant="outline" size="sm">
              Due
            </Button>
          </div>
        </div>

        <CustomerEquipmentList companyId={company.id} />
      </div>

      <EquipmentServiceList companyId={company.id} />

      {/* Report a Fault Section */}
      <Card className="bg-white border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="flex-grow space-y-2">
              <h2 className="text-2xl font-bold">REPORT A FAULT</h2>
              <p className="text-gray-600">Do you need an engineer?</p>
              <Button 
                onClick={() => window.location.href = 'mailto:support@basicwelding.co.uk'}
                className="bg-[#4c6fbf] hover:bg-[#4c6fbf]/90"
              >
                <Bot className="mr-2 h-4 w-4" />
                Request Engineer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};