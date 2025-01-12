import { useState } from "react";
import { TorqueWrench } from "@/types/equipment";
import { BasicDetails } from "./form-sections/BasicDetails";
import { ReadingsSection } from "./form-sections/ReadingsSection";
import { CertificateSection } from "./form-sections/CertificateSection";
import { Button } from "@/components/ui/button";
import { useTorqueWrenchSubmit } from "@/hooks/useTorqueWrenchSubmit";
import { toast } from "sonner";
import { validateForm } from "@/utils/torqueReadingsValidation";

interface TorqueReadingsFormProps {
  equipment: TorqueWrench | null;
  onClose: () => void;
}

export const TorqueReadingsForm = ({ equipment, onClose }: TorqueReadingsFormProps) => {
  const [formData, setFormData] = useState({
    model: equipment?.model || "",
    serialNumber: equipment?.serial_number || "",
    engineer: equipment?.engineer || "",
    min: equipment?.min_torque?.toString() || "",
    max: equipment?.max_torque?.toString() || "",
    units: equipment?.units || "nm",
    date: equipment?.last_service_date || new Date().toISOString().split('T')[0],
    retestDate: equipment?.next_service_due || "",
    readings: equipment?.readings || Array(3).fill({ target: "", actual: "", deviation: "" }),
    definitiveReadings: equipment?.definitive_readings || Array(3).fill({ target: "", actual: "", deviation: "" }),
    notes: equipment?.notes || "",
    status: equipment?.status || "ACTIVE",
    result: equipment?.result || "PASS",
    certNumber: equipment?.cert_number || `BWS-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    sentOn: equipment?.last_service_date || new Date().toISOString().split('T')[0] // Added missing sentOn property
  });

  const { handleSave, isSaving } = useTorqueWrenchSubmit(equipment?.id || null, () => {
    toast.success("Torque wrench data saved successfully");
    onClose();
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
      next_service_due: formData.retestDate,
      engineer: formData.engineer,
      result: formData.result,
      notes: formData.notes,
      readings: formData.readings,
      definitive_readings: formData.definitiveReadings,
      cert_number: formData.certNumber,
      status: formData.status
    };

    try {
      await handleSave(torqueWrenchData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicDetails
        formData={formData}
        onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
      />
      
      <ReadingsSection
        readings={formData.readings}
        definitiveReadings={formData.definitiveReadings}
        onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
      />
      
      <CertificateSection
        formData={formData}
        onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
      />

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};