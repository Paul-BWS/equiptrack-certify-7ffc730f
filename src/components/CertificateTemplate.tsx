import { Certificate, Equipment, ServiceRecord } from "@/types/equipment";
import { CertificateHeader } from "./certificate/CertificateHeader";
import { EquipmentDetails } from "./certificate/EquipmentDetails";
import { TechnicianStatus } from "./certificate/TechnicianStatus";
import { Measurements } from "./certificate/Measurements";
import { CertificateFooter } from "./certificate/CertificateFooter";

interface CertificateTemplateProps {
  certificate: Certificate;
  equipment: Equipment;
  serviceRecord: ServiceRecord;
}

export const CertificateTemplate = ({
  certificate,
  equipment,
  serviceRecord,
}: CertificateTemplateProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg border-8 border-double border-gray-200" id="certificate">
      <CertificateHeader certificate={certificate} />
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-sm font-semibold mb-2 text-primary">Equipment and Standards Used</h2>
          <p className="text-xs">Test Equipment - Torque Master Digital Precision 516.0100. - Traceability NAMAS</p>
        </div>

        <EquipmentDetails equipment={equipment} serviceRecord={serviceRecord} />
        <TechnicianStatus serviceRecord={serviceRecord} />
        <Measurements />
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-sm font-semibold mb-2 text-primary">Notes</h2>
          <p className="min-h-[60px] whitespace-pre-wrap text-[11px]">{serviceRecord.notes}</p>
        </div>

        <CertificateFooter serviceRecord={serviceRecord} />
      </div>
    </div>
  );
};