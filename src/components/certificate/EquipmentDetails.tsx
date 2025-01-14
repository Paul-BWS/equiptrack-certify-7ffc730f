import { Equipment, ServiceRecord } from "@/types/equipment";
import { format, parseISO } from "date-fns";

interface EquipmentDetailsProps {
  equipment: Equipment;
  serviceRecord: ServiceRecord;
}

export const EquipmentDetails = ({ equipment, serviceRecord }: EquipmentDetailsProps) => {
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd/MM/yyyy");
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6 bg-gray-50 print:bg-white p-4 rounded-lg">
      <div className="space-y-3">
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Model</h2>
          <p className="text-sm font-medium">{equipment.model}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Serial Number</h2>
          <p className="text-sm font-medium">{equipment.serial_number}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Calibration Date</h2>
          <p className="text-sm font-medium">{formatDate(serviceRecord.service_date)}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Next Due Date</h2>
          <p className="text-sm font-medium">{formatDate(serviceRecord.next_service_date)}</p>
        </div>
      </div>
    </div>
  );
};