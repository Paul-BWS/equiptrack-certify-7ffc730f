import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Equipment } from "@/types/equipment";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface EquipmentServiceListProps {
  equipment: Equipment[];
  companyId: string;
}

export const EquipmentServiceList = ({ equipment, companyId }: EquipmentServiceListProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Equipment Due for Service
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {equipment.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-[#F9F9F9]"
            >
              <div>
                <h3 className="font-medium text-sm">{item.name}</h3>
                <p className="text-xs text-[#B3B3B3]">
                  Next Service: {item.next_service_due}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-primary hover:bg-primary/90 h-10 w-10 p-0"
                onClick={() => navigate(`/customers/${companyId}/equipment`)}
              >
                <ArrowRight className="h-4 w-4 text-primary-foreground" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};