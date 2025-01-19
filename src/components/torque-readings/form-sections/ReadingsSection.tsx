import { UseFormReturn } from "react-hook-form";
import { TorqueWrenchFormData } from "@/hooks/useTorqueWrenchReadingsForm";
import { ReadingsPanel } from "./ReadingsPanel";

interface ReadingsSectionProps {
  form: UseFormReturn<TorqueWrenchFormData>;
  title: string;
  readOnly?: boolean;
}

export const ReadingsSection = ({
  form,
  title,
  readOnly = false,
}: ReadingsSectionProps) => {
  return (
    <div className="w-full">
      <h3 className="text-base font-medium text-gray-900 mb-4">{title}</h3>
      <ReadingsPanel
        form={form}
        title={title}
        readOnly={readOnly}
      />
    </div>
  );
};