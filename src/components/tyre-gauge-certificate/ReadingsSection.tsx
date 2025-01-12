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
          <div key={rowIndex} className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-3 gap-4 font-semibold text-gray-600 pb-2 text-xs">
              <span>Target</span>
              <span>Actual</span>
              <span>Deviation</span>
            </div>
            <div className="grid grid-cols-3 gap-4 py-2 border-t text-xs">
              <span>{readings[rowIndex]?.target || ''}</span>
              <span>{readings[rowIndex]?.actual || ''}</span>
              <span>{readings[rowIndex]?.deviation || ''}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};