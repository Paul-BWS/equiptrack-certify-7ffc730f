import { Certificate, TorqueWrench, ServiceRecord } from "@/types/equipment";
import { CertificateTemplate } from "../CertificateTemplate";

interface CertificateContentProps {
  certificate: Certificate;
  equipment: TorqueWrench;
  serviceRecord: ServiceRecord;
}

export const CertificateContent = ({
  certificate,
  equipment,
  serviceRecord,
}: CertificateContentProps) => {
  return (
    <div className="flex justify-center">
      <div className="w-full">
        <CertificateTemplate
          certificate={certificate}
          equipment={equipment}
          serviceRecord={serviceRecord}
        />
      </div>
    </div>
  );
};