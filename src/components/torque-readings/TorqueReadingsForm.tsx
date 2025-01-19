import { useState } from "react";
import { TorqueWrench } from "@/types/equipment";
import { BasicDetails } from "./form-sections/BasicDetails";
import { ReadingsSection } from "./form-sections/ReadingsSection";
import { CertificateSection } from "./form-sections/CertificateSection";
import { FormActions } from "./form-sections/FormActions";
import { useTorqueWrenchSubmit } from "@/hooks/useTorqueWrenchSubmit";
import { toast } from "sonner";
import { validateForm } from "@/utils/torqueReadingsValidation";
import { TorqueReadingsForm as TorqueReadingsFormType } from "@/hooks/useTorqueReadingsForm";
import { addDays, format } from "date-fns";

interface TorqueReadingsFormProps {
  equipment: TorqueWrench | null;
  onCancel: () => void;
}

export const TorqueReadingsForm = ({ equipment, onCancel }: TorqueReadingsFormProps) => {
  const today = new Date();
  const nextServiceDate = format(addDays(today, 364), 'yyyy-MM-dd');

  const [formData, setFormData] = useState<TorqueReadingsFormType>({
    model: equipment?.model || "",
    serialNumber: equipment?.serial_number || "",
    engineer: equipment?.engineer || "",
    min: equipment?.min_torque?.toString() || "",
    max: equipment?.max_torque?.toString() || "",
    units: equipment?.units || "nm",
    date: equipment?.last_service_date || format(today, 'yyyy-MM-dd'),
    retestDate: equipment?.next_service_due || nextServiceDate,
    notes: equipment?.notes || "",
    status: equipment?.status || "ACTIVE",
    result: equipment?.result || "PASS",
    certNumber: equipment?.cert_number || "",
    sentOn: equipment?.last_service_date || format(today, 'yyyy-MM-dd'),
    target1: equipment?.target1 || "",
    actual1: equipment?.actual1 || "",
    deviation1: equipment?.deviation1 || "",
    target2: equipment?.target2 || "",
    actual2: equipment?.actual2 || "",
    deviation2: equipment?.deviation2 || "",
    target3: equipment?.target3 || "",
    actual3: equipment?.actual3 || "",
    deviation3: equipment?.deviation3 || "",
    def_target1: equipment?.def_target1 || "",
    def_actual1: equipment?.def_actual1 || "",
    def_deviation1: equipment?.def_deviation1 || "",
    def_target2: equipment?.def_target2 || "",
    def_actual2: equipment?.def_actual2 || "",
    def_deviation2: equipment?.def_deviation2 || "",
    def_target3: equipment?.def_target3 || "",
    def_actual3: equipment?.def_actual3 || "",
    def_deviation3: equipment?.def_deviation3 || ""
  });

  const { handleSave, isSaving } = useTorqueWrenchSubmit(equipment?.id || null, () => {
    toast.success("Torque wrench data saved successfully");
    onCancel();
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      return;
    }

    const pathSegments = window.location.pathname.split('/');
    const companyIdIndex = pathSegments.indexOf('customers') + 1;
    const companyId = pathSegments[companyIdIndex];

    const torqueWrenchData: TorqueWrench = {
      id: equipment?.id,
      company_id: companyId,
      model: formData.model,
      serial_number: formData.serialNumber,
      min_torque: parseFloat(formData.min),
      max_torque: parseFloat(formData.max),
      units: formData.units,
      last_service_date: formData.date,
      next_service_due: format(addDays(new Date(formData.date), 364), 'yyyy-MM-dd'),
      engineer: formData.engineer,
      result: formData.result,
      notes: formData.notes,
      cert_number: formData.certNumber,
      status: formData.status,
      target1: formData.target1,
      actual1: formData.actual1,
      deviation1: formData.deviation1,
      target2: formData.target2,
      actual2: formData.actual2,
      deviation2: formData.deviation2,
      target3: formData.target3,
      actual3: formData.actual3,
      deviation3: formData.deviation3,
      def_target1: formData.def_target1,
      def_actual1: formData.def_actual1,
      def_deviation1: formData.def_deviation1,
      def_target2: formData.def_target2,
      def_actual2: formData.def_actual2,
      def_deviation2: formData.def_deviation2,
      def_target3: formData.def_target3,
      def_actual3: formData.def_actual3,
      def_deviation3: formData.def_deviation3
    };

    try {
      await handleSave(torqueWrenchData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CertificateSection
        formData={formData}
        onChange={(field, value) => {
          setFormData(prev => {
            const newData = { ...prev, [field]: value };
            if (field === 'date') {
              newData.retestDate = format(addDays(new Date(value), 364), 'yyyy-MM-dd');
            }
            return newData;
          });
        }}
      />
      
      <BasicDetails 
        formData={formData} 
        onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
      />
      
      <ReadingsSection
        title="AS FOUND"
        readings={formData}
        onChange={(index, field, value) => {
          const readingNumber = (index + 1).toString();
          const fieldName = `${field}${readingNumber}` as keyof TorqueReadingsFormType;
          setFormData(prev => ({ ...prev, [fieldName]: value }));
        }}
      />

      <ReadingsSection
        title="DEFINITIVE"
        readings={formData}
        readOnly
      />

      <FormActions
        onCancel={onCancel}
        isSaving={isSaving}
        equipmentId={equipment?.id || null}
      />
    </form>
  );
};