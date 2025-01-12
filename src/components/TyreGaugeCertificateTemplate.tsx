import { TyreGauge } from "@/types/tyreGauge";
import { CertificateHeader } from "./tyre-gauge-certificate/CertificateHeader";
import { EquipmentDetails } from "./tyre-gauge-certificate/EquipmentDetails";
import { EngineerStatus } from "./tyre-gauge-certificate/EngineerStatus";
import { Measurements } from "./tyre-gauge-certificate/Measurements";
import { ReadingsSection } from "./tyre-gauge-certificate/ReadingsSection";
import { CertificateFooter } from "./tyre-gauge-certificate/CertificateFooter";

interface TyreGaugeCertificateTemplateProps {
  equipment: TyreGauge;
}

export const TyreGaugeCertificateTemplate = ({
  equipment,
}: TyreGaugeCertificateTemplateProps) => {
  if (!equipment) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg border-8 border-double border-gray-200" id="certificate">
      <CertificateHeader certNumber={equipment?.cert_number} />
      
      <div className="space-y-3">
        <EquipmentDetails
          model={equipment?.model}
          serialNumber={equipment?.serial_number}
          lastServiceDate={equipment?.last_service_date}
          nextServiceDue={equipment?.next_service_due}
        />
        
        <EngineerStatus
          engineer={equipment?.engineer}
          status={equipment?.status}
        />
        
        <Measurements
          min={equipment?.min_pressure}
          max={equipment?.max_pressure}
          units={equipment?.units}
          result={equipment?.result}
        />

        <div className="grid grid-cols-2 gap-4">
          <ReadingsSection 
            title="As Found" 
            readings={equipment?.readings || []} 
          />
          <ReadingsSection 
            title="Definitive" 
            readings={equipment?.definitive_readings || []} 
          />
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <h2 className="text-sm font-semibold mb-1 text-primary">Equipment and Standards Used</h2>
          <p className="text-xs">Test Equipment - Digital Pressure Calibrator - Traceability NAMAS</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <h2 className="text-sm font-semibold mb-1 text-primary">Notes</h2>
          <p className="min-h-[40px] whitespace-pre-wrap text-xs">{equipment?.notes}</p>
        </div>

        <CertificateFooter />
      </div>
    </div>
  );
};