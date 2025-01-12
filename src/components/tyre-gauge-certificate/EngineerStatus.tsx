interface EngineerStatusProps {
  engineer: string;
  status: string;
}

export const EngineerStatus = ({ engineer, status }: EngineerStatusProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase">Engineer</h2>
        <p className="text-sm font-medium">{engineer}</p>
      </div>
      <div>
        <h2 className="text-xs font-semibold text-gray-500 uppercase">Status</h2>
        <p className="text-sm font-medium text-green-600">{status}</p>
      </div>
    </div>
  );
};