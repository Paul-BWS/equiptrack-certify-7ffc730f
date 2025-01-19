import { UseFormReturn } from "react-hook-form";
import { TorqueWrenchFormData } from "@/hooks/useTorqueWrenchReadingsForm";
import { calculateDeviation } from "@/utils/deviationCalculator";
import { useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ReadingsPanelProps {
  form: UseFormReturn<TorqueWrenchFormData>;
  title: string;
  readOnly?: boolean;
}

export const ReadingsPanel = ({ form, title, readOnly }: ReadingsPanelProps) => {
  const updateDeviation = (index: number, prefix: string = '') => {
    const readingNumber = (index + 1).toString();
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

  useEffect(() => {
    const prefix = title.toLowerCase().includes('definitive') ? 'def_' : '';
    const subscription = form.watch((value, { name }) => {
      if (name?.includes('target') || name?.includes('actual')) {
        const match = name.match(/\d+$/);
        if (match) {
          const index = parseInt(match[0]);
          updateDeviation(index - 1, prefix);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form, title]);

  return (
    <div className="space-y-6 rounded-lg bg-[#F9F9F9] p-4 md:p-6">
      <div className="space-y-6">
        {[1, 2, 3].map((index) => {
          const prefix = title.toLowerCase().includes('definitive') ? 'def_' : '';
          return (
            <div key={`${title}-${index}`} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name={`${prefix}target${index}` as keyof TorqueWrenchFormData}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-[#C8C8C9]">Target</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          readOnly={readOnly}
                          className="h-12 bg-white border-[#E5E7EB] border-[0.5px] rounded-md text-base touch-manipulation"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`${prefix}actual${index}` as keyof TorqueWrenchFormData}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-[#C8C8C9]">Actual</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          readOnly={readOnly}
                          className="h-12 bg-white border-[#E5E7EB] border-[0.5px] rounded-md text-base touch-manipulation"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`${prefix}deviation${index}` as keyof TorqueWrenchFormData}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-[#C8C8C9]">Deviation (%)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          readOnly
                          className="h-12 bg-gray-50 border-[#E5E7EB] border-[0.5px] rounded-md text-base"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};