import { getOrganizationSettings } from "@/utils/settings";

export const CertificateFooter = () => {
  const settings = getOrganizationSettings();
  
  return (
    <>
      <div className="mt-6 flex justify-between items-center gap-4 border-t pt-4">
        <div className="text-left">
          <p className="text-xs text-gray-600">{settings.address}</p>
        </div>
        <div className="flex items-center gap-4">
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
      </div>

      <div className="mt-4 pt-4 border-t">
        <p className="text-xs text-gray-600 text-center">
          Pressure Equipment Tested according to BS EN 837-1:1998
        </p>
      </div>
    </>
  );
};