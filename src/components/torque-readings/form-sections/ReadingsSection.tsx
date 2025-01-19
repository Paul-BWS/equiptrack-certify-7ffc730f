import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { TorqueWrenchFormData } from "@/hooks/useTorqueWrenchReadingsForm";
import { calculateDeviation } from "@/utils/deviationCalculator";
import { useEffect } from "react";

interface ReadingsSectionProps {
  form: UseFormReturn<TorqueWrenchFormData>;
  title: string;
  readOnly?: boolean;
}

export const ReadingsSection = ({ form, title, readOnly }: ReadingsSectionProps) => {
  const updateDeviation = (index: number) => {
    const readingNumber = (index + 1).toString();
    const prefix = title.toLowerCase().includes('definitive') ? 'def_' : '';
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
          const index = parseInt(match[0]);
          updateDeviation(index);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <div className="bg-[#F9F9F9] p-6 rounded-lg space-y-6">
      <h3 className="text-base font-medium text-gray-900">{title}</h3>
      {[1, 2, 3].map((index) => {
        const readingNumber = index.toString();
        const prefix = title.toLowerCase().includes('definitive') ? 'def_' : '';
        
        return (
          <div key={`${title}-${index}`} className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name={`${prefix}target${readingNumber}` as keyof TorqueWrenchFormData}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[#C8C8C9]">Target</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      readOnly={readOnly}
                      className="h-12 bg-white border-[#E5E7EB] border-[0.5px] rounded-md text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`${prefix}actual${readingNumber}` as keyof TorqueWrenchFormData}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[#C8C8C9]">Actual</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      readOnly={readOnly}
                      className="h-12 bg-white border-[#E5E7EB] border-[0.5px] rounded-md text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`${prefix}deviation${readingNumber}` as keyof TorqueWrenchFormData}
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      })}
    </div>
  );
};