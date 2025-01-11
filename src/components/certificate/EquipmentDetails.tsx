import { Equipment, ServiceRecord } from "@/types/equipment";

interface EquipmentDetailsProps {
  equipment: Equipment;
  serviceRecord: ServiceRecord;
}

export const EquipmentDetails = ({ equipment, serviceRecord }: EquipmentDetailsProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
      <div className="space-y-3">
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Model</h2>
          <p className="text-sm font-medium">{equipment.model}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Serial Number</h2>
          <p className="text-sm font-medium">{equipment.serialNumber}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Calibration Date</h2>
          <p className="text-sm font-medium">{serviceRecord.date}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Next Due Date</h2>
          <p className="text-sm font-medium">{serviceRecord.nextDueDate}</p>
        </div>
      </div>
    </div>
  );
};