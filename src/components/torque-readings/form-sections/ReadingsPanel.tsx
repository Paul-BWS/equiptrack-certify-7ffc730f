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

  const updateDeviation = (index: number) => {
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
    const subscription = form.watch((value, { name }) => {
      if (name?.includes('target') || name?.includes('actual')) {
        const match = name.match(/\d+$/);
        if (match) {
          const index = parseInt(match[0]) - 1;
          updateDeviation(index);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <div className="space-y-6">
      {[0, 1, 2].map((index) => {
        const readingNumber = (index + 1).toString();
        return (
          <div key={`${title}-${index}`} className="grid grid-cols-3 gap-4">
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
        );
      })}
    </div>
  );
};