import { getOrganizationSettings } from "@/utils/settings";
import { format } from "date-fns";

interface BeamsetterCertificateTemplateProps {
  equipment: any;
}

export const BeamsetterCertificateTemplate = ({ equipment }: BeamsetterCertificateTemplateProps) => {
  const settings = getOrganizationSettings();

  const formatDate = (date: string | null) => {
    if (!date) return "";
    return format(new Date(date), "dd/MM/yyyy");
  };

  return (
    <div className="w-full bg-white border border-gray-200 print:border-0" id="certificate">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div className="flex items-center gap-4">
          <img src={settings.logo} alt="Company Logo" className="h-16 w-auto" />
          <div>
            <h1 className="text-xl font-bold text-primary">CALIBRATION CERTIFICATE</h1>
            <p className="text-xs text-gray-600">BS 10125</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-base font-semibold text-primary">Certificate No:</p>
          <p className="text-base">{equipment.cert_number}</p>
        </div>
      </div>

      <div className="space-y-6 p-4">
        <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
          <div className="space-y-3">
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Model</h2>
              <p className="text-sm font-medium">{equipment.model}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Serial Number</h2>
              <p className="text-sm font-medium">{equipment.serial_number}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Calibration Date</h2>
              <p className="text-sm font-medium">{formatDate(equipment.last_service_date)}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Next Due Date</h2>
              <p className="text-sm font-medium">{formatDate(equipment.next_service_due)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-sm font-semibold mb-3 text-primary">Function Tested</h2>
          <p className="text-sm mb-4">Unit calibrated using laser alignment unit model AK9999</p>
          
          <p className="text-sm">
            I/We hereby Certify that the above equipment has been tested /inspected in accordance with
            manufacturers specifications and in accordance with BS 10125 requirements
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-sm font-semibold mb-1 text-primary">Notes</h2>
          <p className="min-h-[40px] whitespace-pre-wrap text-[11px]">{equipment.notes}</p>
        </div>

        <div className="mt-6 flex justify-between items-center gap-4 border-t pt-4">
          <div className="text-left space-y-1">
            <p className="text-xs font-medium">BWS LTD</p>
            <p className="text-xs text-gray-600">{settings.address}</p>
            <a 
              href="https://www.basicwelding.co.uk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-primary hover:underline"
            >
              www.basicwelding.co.uk
            </a>
          </div>
          <div className="flex items-center gap-4">
            <img 
              src={settings.digitalSignature} 
              alt="Digital Signature" 
              className="h-12 w-auto"
            />
            <div className="text-right">
              <p className="text-xs font-medium">{equipment.engineer}</p>
              <p className="text-xs text-gray-600">Authorized Signatory</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};