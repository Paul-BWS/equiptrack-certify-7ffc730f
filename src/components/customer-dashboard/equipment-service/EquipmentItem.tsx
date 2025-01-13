import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";

interface EquipmentItemProps {
  id: string;
  type: string;
  model: string;
  displayType: string;
  serial_number: string;
  next_service_due: string;
  companyId: string;
}

export const EquipmentItem = ({
  id,
  type,
  model,
  displayType,
  serial_number,
  next_service_due,
  companyId,
}: EquipmentItemProps) => {
  const navigate = useNavigate();

  const getEquipmentRoute = (type: string) => {
    switch (type) {
      case 'torque-wrench':
        return 'torque-wrenches';
      case 'tyre-gauge':
        return 'tyre-gauges';
      default:
        return type + 's';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-sm text-gray-900">{model}</h3>
          <span className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
            {displayType}
          </span>
        </div>
        <p className="text-xs text-gray-500">S/N: {serial_number}</p>
        <p className="text-xs text-gray-500">
          Next Service: {format(parseISO(next_service_due), 'dd/MM/yyyy')}
        </p>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="bg-white hover:bg-white/90 border-[#0EA5E9] text-[#0EA5E9] h-10 w-10 p-0"
        onClick={() =>
          navigate(`/customers/${companyId}/equipment/${getEquipmentRoute(type)}`)
        }
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};