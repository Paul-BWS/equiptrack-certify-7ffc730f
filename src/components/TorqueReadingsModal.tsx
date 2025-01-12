import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoadingState } from "./torque-readings/LoadingState";
import { ReadingsHandler } from "./torque-readings/ReadingsHandler";
import { FormInitializer } from "./torque-readings/FormInitializer";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import { useTorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";
import { useTorqueWrenchSubmit } from "@/hooks/useTorqueWrenchSubmit";
import { useCertificateGeneration } from "@/hooks/useCertificateGeneration";
import { validateForm } from "@/utils/torqueReadingsValidation";
import { TorqueWrench, ServiceRecord } from "@/types/equipment";
import { toast } from "sonner";
import { CertificateModal } from "./CertificateModal";
import { useEffect } from "react";

interface TorqueReadingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}

export const TorqueReadingsModal = ({
  open,
  onOpenChange,
  equipmentId,
}: TorqueReadingsModalProps) => {
  const { data: equipment, isLoading, error } = useEquipmentData(equipmentId, open);
  const { readings, setReadings, resetForm } = useTorqueReadingsForm(equipment, open);
  const { showCertificate, setShowCertificate, generateCertificate } = useCertificateGeneration(equipmentId);
  
  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open, resetForm]);

  const { handleSave: submitData, isSaving } = useTorqueWrenchSubmit(equipmentId, () => {
    onOpenChange(false);
    toast.success("Torque wrench data saved successfully");
  });

  if (error) {
    toast.error("Failed to load equipment data");
    return null;
  }

  if (isLoading) {
    return <LoadingState open={open} onOpenChange={onOpenChange} />;
  }

  const pathSegments = window.location.pathname.split('/');
  const companyIdIndex = pathSegments.indexOf('customers') + 1;
  const companyId = pathSegments[companyIdIndex];

  const torqueWrenchData: TorqueWrench = {
    id: equipmentId || undefined,
    company_id: companyId,
    model: readings.model,
    serial_number: readings.serialNumber,
    min_torque: parseFloat(readings.min),
    max_torque: parseFloat(readings.max),
    units: readings.units,
    last_service_date: readings.date,
    next_service_due: readings.retestDate,
    engineer: readings.engineer,
    result: readings.result,
    notes: readings.notes,
    readings: readings.readings,
    definitive_readings: readings.definitiveReadings,
    cert_number: readings.certNumber,
    status: readings.status
  };

  const defaultServiceRecord: ServiceRecord = {
    id: "",
    torque_wrench_id: equipmentId || "",
    service_date: readings.date,
    service_type: "Calibration",
    technician: readings.engineer,
    notes: readings.notes || "",
    next_service_date: readings.retestDate
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(readings)) {
      return;
    }

    try {
      await submitData(torqueWrenchData);
      console.log("Form submitted:", readings);
      generateCertificate(torqueWrenchData, defaultServiceRecord);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-[#FFFFFF]">
          <DialogHeader>
            <DialogTitle>Torque Wrench Readings</DialogTitle>
          </DialogHeader>

          <FormInitializer 
            equipmentId={equipmentId}
            open={open}
            setReadings={setReadings}
          />

          <ReadingsHandler
            readings={readings}
            setReadings={setReadings}
            handleSubmit={handleSubmit}
            handleSave={() => submitData(torqueWrenchData)}
            isSaving={isSaving}
          />
        </DialogContent>
      </Dialog>

      <CertificateModal
        open={showCertificate}
        onOpenChange={setShowCertificate}
        certificate={generateCertificate(torqueWrenchData, defaultServiceRecord)}
        equipment={torqueWrenchData}
        serviceRecord={defaultServiceRecord}
      />
    </>
  );
};