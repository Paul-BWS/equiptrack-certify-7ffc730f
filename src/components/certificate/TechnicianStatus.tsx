import { ServiceRecord } from "@/types/equipment";

interface TechnicianStatusProps {
  serviceRecord: ServiceRecord;
}

export const TechnicianStatus = ({ serviceRecord }: TechnicianStatusProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase">Engineer</h2>
        <p className="text-sm font-medium">{serviceRecord.technician}</p>
      </div>
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase">Status</h2>
        <p className="text-sm font-medium text-green-600">ACTIVE</p>
      </div>
    </div>
  );
};