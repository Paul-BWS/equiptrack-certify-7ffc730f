import { getOrganizationSettings } from "@/utils/settings";
import { Certificate } from "@/types/equipment";

interface CertificateHeaderProps {
  certificate: Certificate;
}

export const CertificateHeader = ({ certificate }: CertificateHeaderProps) => {
  const settings = getOrganizationSettings();

  return (
    <div className="flex justify-between items-center mb-6 border-b pb-4">
      <div className="flex items-center gap-4">
        <img src={settings.logo} alt="Company Logo" className="h-12 w-auto" />
        <div>
          <h1 className="text-lg font-bold text-primary">CALIBRATION CERTIFICATE</h1>
          <p className="text-xs text-gray-600">{settings.organizationName}</p>
          <p className="text-xs text-gray-600">ISO 9001:2015 Certified</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-base font-semibold text-primary">Certificate No:</p>
        <p className="text-base">{certificate.certificationNumber}</p>
      </div>
    </div>
  );
};