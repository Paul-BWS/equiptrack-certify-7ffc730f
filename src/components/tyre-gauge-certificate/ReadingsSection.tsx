import { Reading } from "@/types/tyreGauge";

interface ReadingsSectionProps {
  title: string;
  readings: Reading[];
}

export const ReadingsSection = ({ title, readings }: ReadingsSectionProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-sm font-semibold mb-3 text-primary">{title}</h2>
      <div>
        {/* Single header row */}
        <div className="grid grid-cols-3 gap-4 font-semibold text-gray-600 pb-2 text-xs">
          <span>Target</span>
          <span>Actual</span>
          <span>Deviation</span>
        </div>
        
        {/* Two rows of readings */}
        {[0, 1].map((index) => (
          <div key={index} className="grid grid-cols-3 gap-4 py-2 border-t text-xs">
            <span>{readings[index]?.target || ''}</span>
            <span>{readings[index]?.actual || ''}</span>
            <span>{readings[index]?.deviation || ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
};