import { UseFormReturn } from "react-hook-form";
import { TorqueWrenchFormData } from "@/hooks/useTorqueWrenchReadingsForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { calculateDeviation } from "@/utils/deviationCalculator";
import { useEffect } from "react";

interface ReadingsPanelProps {
  form: UseFormReturn<TorqueWrenchFormData>;
  title: string;
  readOnly?: boolean;
}

export const ReadingsPanel = ({
  form,
  title,
  readOnly = false,
}: ReadingsPanelProps) => {
  const prefix = title.toLowerCase().includes('definitive') ? 'def_' : '';

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (!name) return;
      
      // Only proceed if this is an AS FOUND field (no prefix)
      if (!name.includes('def_') && (name.includes('target') || name.includes('actual'))) {
        const match = name.match(/\d+$/);
        if (match) {
          const index = match[0];
          const fieldType = name.includes('target') ? 'target' : 'actual';
          
          // Mirror values to definitive section
          const defField = `def_${fieldType}${index}` as keyof TorqueWrenchFormData;
          const sourceValue = form.getValues(name as keyof TorqueWrenchFormData);
          form.setValue(defField, sourceValue);

          // Update both deviations
          updateDeviation(parseInt(index));
          updateDefDeviation(parseInt(index));
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const updateDeviation = (readingNumber: number) => {
    const targetField = `${prefix}target${readingNumber}` as keyof TorqueWrenchFormData;
    const actualField = `${prefix}actual${readingNumber}` as keyof TorqueWrenchFormData;
    const deviationField = `${prefix}deviation${readingNumber}` as keyof TorqueWrenchFormData;

    const target = form.getValues(targetField);
    const actual = form.getValues(actualField);

    if (target && actual) {
      const deviation = calculateDeviation(target, actual);
      form.setValue(deviationField, deviation);
    }
  };

  const updateDefDeviation = (readingNumber: number) => {
    const targetField = `def_target${readingNumber}` as keyof TorqueWrenchFormData;
    const actualField = `def_actual${readingNumber}` as keyof TorqueWrenchFormData;
    const deviationField = `def_deviation${readingNumber}` as keyof TorqueWrenchFormData;

    const target = form.getValues(targetField);
    const actual = form.getValues(actualField);

    if (target && actual) {
      const deviation = calculateDeviation(target, actual);
      form.setValue(deviationField, deviation);
    }
  };

  return (
    <div className="space-y-6">
      {[1, 2, 3].map((readingNumber) => (
        <div key={`${title}-${readingNumber}`} className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name={`${prefix}target${readingNumber}` as keyof TorqueWrenchFormData}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#C8C8C9]">Target</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className="h-12 bg-white border-gray-200 text-base"
                    readOnly={readOnly}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`${prefix}actual${readingNumber}` as keyof TorqueWrenchFormData}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#C8C8C9]">Actual</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className="h-12 bg-white border-gray-200 text-base"
                    readOnly={readOnly}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`${prefix}deviation${readingNumber}` as keyof TorqueWrenchFormData}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#C8C8C9]">Deviation (%)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    readOnly
                    className="h-12 bg-gray-50 border-gray-200 text-base"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  );
};