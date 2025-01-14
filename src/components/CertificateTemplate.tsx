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
    <div className="w-full bg-white border border-gray-200 print:border-0" id="certificate">
      <CertificateHeader certificate={certificate} />
      
      <div className="space-y-3">
        <EquipmentDetails equipment={equipment} serviceRecord={serviceRecord} />
        <TechnicianStatus serviceRecord={serviceRecord} />
        <Measurements />
        
        <div className="bg-gray-50 print:bg-white p-3 rounded-lg">
          <h2 className="text-sm font-semibold mb-1 text-primary">Equipment and Standards Used</h2>
          <p className="text-xs">Test Equipment - Torque Master Digital Precision 516.0100. - Traceability NAMAS</p>
        </div>

        <div className="bg-gray-50 print:bg-white p-3 rounded-lg">
          <h2 className="text-sm font-semibold mb-1 text-primary">Notes</h2>
          <p className="min-h-[40px] whitespace-pre-wrap text-[11px]">{serviceRecord.notes}</p>
        </div>

        <CertificateFooter />
      </div>
    </div>
  );
};