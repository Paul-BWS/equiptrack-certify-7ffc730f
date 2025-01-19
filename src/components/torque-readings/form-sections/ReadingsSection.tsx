import { UseFormReturn } from "react-hook-form";
import { TorqueWrenchFormData } from "@/hooks/useTorqueWrenchReadingsForm";
import { ReadingsPanel } from "./ReadingsPanel";
import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";

interface ReadingsSectionProps {
  form: UseFormReturn<TorqueWrenchFormData>;
  title: string;
  readOnly?: boolean;
  readings?: TorqueReadingsForm;
  onChange?: (index: number, field: string, value: string) => void;
}

export const ReadingsSection = ({
  form,
  title,
  readOnly = false,
  readings,
  onChange,
}: ReadingsSectionProps) => {
  return (
    <div className="w-full">
      <h3 className="text-base font-medium text-gray-900 mb-4">{title}</h3>
      {form ? (
        <ReadingsPanel
          form={form}
          title={title}
          readOnly={readOnly}
        />
      ) : readings && (
        <div className="space-y-4">
          {[0, 1, 2].map((index) => {
            const readingNumber = (index + 1).toString();
            const prefix = title?.toLowerCase().includes('definitive') ? 'def_' : '';
            const targetField = `${prefix}target${readingNumber}` as keyof TorqueReadingsForm;
            const actualField = `${prefix}actual${readingNumber}` as keyof TorqueReadingsForm;
            const deviationField = `${prefix}deviation${readingNumber}` as keyof TorqueReadingsForm;
            
            return (
              <div key={`${title}-${index}`} className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-base text-[#C8C8C9]">Target</label>
                  <input
                    type="number"
                    value={readings[targetField] || ''}
                    onChange={(e) => onChange?.(index, 'target', e.target.value)}
                    className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base"
                    readOnly={readOnly}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-base text-[#C8C8C9]">Actual</label>
                  <input
                    type="number"
                    value={readings[actualField] || ''}
                    onChange={(e) => onChange?.(index, 'actual', e.target.value)}
                    className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base"
                    readOnly={readOnly}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-base text-[#C8C8C9]">Deviation (%)</label>
                  <input
                    value={readings[deviationField] || ''}
                    className="flex h-12 w-full rounded-md border border-gray-200 bg-[#F1F1F1] px-3 py-2 text-base"
                    readOnly
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};