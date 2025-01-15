interface MeasurementsProps {
  min?: number;
  max?: number;
  units?: string;
  result?: string;
}

export const Measurements = ({ min, max, units, result }: MeasurementsProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Min</h2>
          <p className="text-sm font-medium">{min || 0}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Max</h2>
          <p className="text-sm font-medium">{max || 0}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Units</h2>
          <p className="text-sm font-medium">{units || 'psi'}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Result</h2>
          <p className={`text-sm font-medium ${result === 'PASS' ? 'text-green-600' : 'text-red-600'}`}>
            {result || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};