import { UseFormReturn } from "react-hook-form";
import { BeamsetterFormData } from "@/types/beamsetter-form";
import { CertificateField } from "./fields/CertificateField";
import { ModelField } from "./fields/ModelField";
import { SerialNumberField } from "./fields/SerialNumberField";
import { EngineerField } from "./fields/EngineerField";
import { LastServiceDateField } from "./fields/LastServiceDateField";

interface BasicDetailsProps {
  form: UseFormReturn<BeamsetterFormData>;
}

export const BasicDetails = ({ form }: BasicDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#F9F9F9] p-6 rounded-lg space-y-4">
        <CertificateField form={form} />
      </div>
      
      <div className="bg-[#F9F9F9] p-6 rounded-lg space-y-4">
        <ModelField form={form} />
        <SerialNumberField form={form} />
        <EngineerField form={form} />
        <LastServiceDateField form={form} />
      </div>
    </div>
  );
};