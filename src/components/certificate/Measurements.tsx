interface ReadingType {
  target: string;
  actual: string;
  deviation: string;
}

interface ReadingsTableProps {
  title: string;
  readings: ReadingType[];
}

const ReadingsTable = ({ title, readings }: ReadingsTableProps) => (
  <div>
    <h2 className="text-sm font-semibold mb-3 text-primary">{title}</h2>
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-4 font-semibold text-gray-600 pb-2 text-xs">
        <span>Target</span>
        <span>Actual</span>
        <span>Deviation</span>
      </div>
      {readings.map((reading, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 py-2 border-t text-xs">
          <span>{reading.target}</span>
          <span>{reading.actual}</span>
          <span>{reading.deviation}</span>
        </div>
      ))}
    </div>
  </div>
);

export const Measurements = () => {
  const readings = [
    { target: "40", actual: "38.9", deviation: "-2.8%" },
    { target: "190", actual: "185.0", deviation: "-2.6%" },
    { target: "340", actual: "329.0", deviation: "-3.2%" },
  ];

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Min</h2>
          <p className="text-sm font-medium">40</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Max</h2>
          <p className="text-sm font-medium">340</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Units</h2>
          <p className="text-sm font-medium">nm</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Result</h2>
          <p className="text-sm font-medium text-green-600">PASS</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <ReadingsTable title="As Found" readings={readings} />
        <ReadingsTable title="Definitive" readings={readings} />
      </div>
    </div>
  );
};