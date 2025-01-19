import { UseFormReturn } from "react-hook-form";
import { TorqueWrenchFormData } from "@/hooks/useTorqueWrenchReadingsForm";
import { ReadingsPanel } from "./ReadingsPanel";

interface ReadingsSectionProps {
  form: UseFormReturn<TorqueWrenchFormData>;
  title: string;
  readOnly?: boolean;
}

export const ReadingsSection = ({ form, title, readOnly }: ReadingsSectionProps) => {
  return (
    <div className="w-full">
      <ReadingsPanel
        form={form}
        title={title}
        readOnly={readOnly}
      />
    </div>
  );
};