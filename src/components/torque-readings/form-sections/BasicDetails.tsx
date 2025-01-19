import { UseFormReturn } from "react-hook-form";
import { CertificateField } from "./fields/CertificateField";
import { ModelField } from "./fields/ModelField";
import { SerialNumberField } from "./fields/SerialNumberField";
import { EngineerField } from "./fields/EngineerField";
import { LastServiceDateField } from "./fields/LastServiceDateField";
import { MinTorqueField } from "./fields/MinTorqueField";
import { MaxTorqueField } from "./fields/MaxTorqueField";
import { UnitsField } from "./fields/UnitsField";

interface BasicDetailsProps {
  form: UseFormReturn<any>;
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
        <MinTorqueField form={form} />
        <MaxTorqueField form={form} />
        <UnitsField form={form} />
      </div>
    </div>
  );
};