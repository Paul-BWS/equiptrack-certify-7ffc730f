import { format, parseISO } from "date-fns";

interface EquipmentDetailsProps {
  model: string;
  serialNumber: string;
  lastServiceDate: string | null;
  nextServiceDue: string | null;
}

export const EquipmentDetails = ({
  model,
  serialNumber,
  lastServiceDate,
  nextServiceDue,
}: EquipmentDetailsProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    try {
      return format(parseISO(dateString), "dd/MM/yyyy");
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
      <div className="space-y-3">
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Model</h2>
          <p className="text-sm font-medium">{model}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Serial Number</h2>
          <p className="text-sm font-medium">{serialNumber}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Calibration Date</h2>
          <p className="text-sm font-medium">{formatDate(lastServiceDate)}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Next Due Date</h2>
          <p className="text-sm font-medium">{formatDate(nextServiceDue)}</p>
        </div>
      </div>
    </div>
  );
};