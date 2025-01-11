import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CertificateModal } from "./CertificateModal";
import { LoadingState } from "./torque-readings/LoadingState";
import { TorqueReadingsContent } from "./torque-readings/TorqueReadingsContent";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import { useTorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";
import { useTorqueWrenchSubmit } from "@/hooks/useTorqueWrenchSubmit";
import { validateForm } from "@/utils/torqueReadingsValidation";
import { TorqueWrench, ServiceRecord } from "@/types/equipment";
import { prepareCertificateData } from "@/utils/certificateDataPreparation";

interface TorqueReadingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}

const calculateDeviation = (target: string, actual: string): string => {
  if (!target || !actual) return "";
  const targetNum = parseFloat(target);
  const actualNum = parseFloat(actual);
  if (isNaN(targetNum) || isNaN(actualNum) || targetNum === 0) return "";
  const deviation = ((actualNum - targetNum) / targetNum) * 100;
  return deviation.toFixed(2);
};

export const TorqueReadingsModal = ({
  open,
  onOpenChange,
  equipmentId,
}: TorqueReadingsModalProps) => {
  const { data: equipment, isLoading } = useEquipmentData(equipmentId, open);
  const { readings, setReadings } = useTorqueReadingsForm(equipment, open);
  const [showCertificate, setShowCertificate] = useState(false);
  
  const { handleSave: submitData, isSaving } = useTorqueWrenchSubmit(equipmentId, () => onOpenChange(false));

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(readings)) {
      return;
    }

    console.log("Form submitted:", readings);
    setShowCertificate(true);
  };

  const handleReadingChange = (index: number, field: string, value: string) => {
    const newReadings = [...readings.readings];
    newReadings[index] = { ...newReadings[index], [field]: value };

    if (field === 'target' || field === 'actual') {
      const target = field === 'target' ? value : newReadings[index].target;
      const actual = field === 'actual' ? value : newReadings[index].actual;
      newReadings[index].deviation = calculateDeviation(target, actual);
    }

    const newDefinitiveReadings = [...newReadings];

    setReadings({ 
      ...readings, 
      readings: newReadings,
      definitiveReadings: newDefinitiveReadings
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-[#FFFFFF]">
          <DialogHeader>
            <DialogTitle>Torque Wrench Readings</DialogTitle>
          </DialogHeader>

          <TorqueReadingsContent
            readings={readings}
            setReadings={setReadings}
            handleSubmit={handleSubmit}
            handleSave={() => submitData(torqueWrenchData)}
            isSaving={isSaving}
            handleReadingChange={handleReadingChange}
          />
        </DialogContent>
      </Dialog>

      <CertificateModal
        open={showCertificate}
        onOpenChange={setShowCertificate}
        certificate={prepareCertificateData(readings, equipmentId)}
        equipment={torqueWrenchData}
        serviceRecord={defaultServiceRecord}
      />
    </>
  );
};