import { CompanyCard } from "./CompanyCard";
import { EquipmentServiceList } from "./EquipmentServiceList";
import { Company } from "@/types/company";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Robot } from "lucide-react";

interface DashboardContentProps {
  company: Company;
}

export const DashboardContent = ({ company }: DashboardContentProps) => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <CompanyCard company={company} />
      <EquipmentServiceList companyId={company.id} />

      {/* Report a Fault Section */}
      <Card className="bg-white border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <img 
                src="/robot.png" 
                alt="Robot Assistant" 
                className="w-24 h-24"
              />
            </div>
            <div className="flex-grow space-y-2">
              <h2 className="text-2xl font-bold">REPORT A FAULT</h2>
              <p className="text-gray-600">Do you need an engineer?</p>
              <Button 
                onClick={() => window.location.href = 'mailto:support@basicwelding.co.uk'}
                className="bg-[#4c6fbf] hover:bg-[#4c6fbf]/90"
              >
                <Robot className="mr-2 h-4 w-4" />
                Request Engineer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};