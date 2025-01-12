interface MeasurementsProps {
  min: string | number;
  max: string | number;
  units: string;
  result: string;
}

export const Measurements = ({ min, max, units, result }: MeasurementsProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Min</h2>
          <p className="text-sm font-medium">{min}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Max</h2>
          <p className="text-sm font-medium">{max}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Units</h2>
          <p className="text-sm font-medium">{units}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Result</h2>
          <p className="text-sm font-medium text-green-600">{result}</p>
        </div>
      </div>
    </div>
  );
};