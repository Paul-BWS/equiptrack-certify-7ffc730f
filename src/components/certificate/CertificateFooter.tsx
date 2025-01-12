import { ServiceRecord } from "@/types/equipment";
import { getOrganizationSettings } from "@/utils/settings";

interface CertificateFooterProps {
  serviceRecord: ServiceRecord;
}

export const CertificateFooter = ({ serviceRecord }: CertificateFooterProps) => {
  const settings = getOrganizationSettings();
  
  return (
    <>
      <div className="mt-6 flex justify-end items-center gap-4 border-t pt-4">
        <img 
          src={settings.digitalSignature} 
          alt="Digital Signature" 
          className="h-12 w-auto"
        />
        <div className="text-right">
          <p className="text-xs font-medium">Paul Jones</p>
          <p className="text-xs text-gray-600">Authorized Signatory</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <p className="text-xs text-gray-600 text-center">
          Torque Equipment Tested according to BS EN ISO 6789:2017 Tolerance +/- 4% of stated load
        </p>
      </div>
    </>
  );
};