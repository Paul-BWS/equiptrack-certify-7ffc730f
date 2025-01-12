import { Reading } from "@/types/tyreGauge";

interface ReadingsSectionProps {
  title: string;
  readings: Reading[];
}

export const ReadingsSection = ({ title, readings }: ReadingsSectionProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-sm font-semibold mb-3 text-primary">{title}</h2>
      <div className="space-y-4">
        {[0, 1].map((rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-3 gap-4">
            <div className="grid grid-cols-3 gap-4 font-semibold text-gray-600 pb-2 text-xs">
              <span>Target</span>
              <span>Actual</span>
              <span>Deviation</span>
            </div>
            {readings.slice(rowIndex * 2, (rowIndex + 1) * 2).map((reading, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 py-2 border-t text-xs">
                <span>{reading.target}</span>
                <span>{reading.actual}</span>
                <span>{reading.deviation}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};