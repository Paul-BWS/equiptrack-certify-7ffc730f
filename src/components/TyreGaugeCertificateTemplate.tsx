import { TyreGauge } from "@/types/tyreGauge";
import { getOrganizationSettings } from "@/utils/settings";

interface TyreGaugeCertificateTemplateProps {
  equipment: TyreGauge;
}

export const TyreGaugeCertificateTemplate = ({
  equipment,
}: TyreGaugeCertificateTemplateProps) => {
  const settings = getOrganizationSettings();
  const readings = equipment?.readings || [];
  const definitiveReadings = equipment?.definitive_readings || [];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg border-8 border-double border-gray-200" id="certificate">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div className="flex items-center gap-4">
          <img src={settings.logo} alt="Company Logo" className="h-16 w-auto" />
          <div>
            <h1 className="text-xl font-bold text-primary">CALIBRATION CERTIFICATE</h1>
            <p className="text-xs text-gray-600">BS EN 837-1:1998</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-base font-semibold text-primary">Certificate No:</p>
          <p className="text-base">{equipment?.cert_number}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
          <div className="space-y-3">
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Model</h2>
              <p className="text-sm font-medium">{equipment?.model}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Serial Number</h2>
              <p className="text-sm font-medium">{equipment?.serial_number}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Calibration Date</h2>
              <p className="text-sm font-medium">{equipment?.last_service_date}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Next Due Date</h2>
              <p className="text-sm font-medium">{equipment?.next_service_due}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase">Engineer</h2>
            <p className="text-sm font-medium">{equipment?.engineer}</p>
          </div>
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase">Status</h2>
            <p className="text-sm font-medium text-green-600">{equipment?.status}</p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Min</h2>
              <p className="text-sm font-medium">{equipment?.min_pressure}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Max</h2>
              <p className="text-sm font-medium">{equipment?.max_pressure}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Units</h2>
              <p className="text-sm font-medium">{equipment?.units}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Result</h2>
              <p className="text-sm font-medium text-green-600">{equipment?.result}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-sm font-semibold mb-3 text-primary">As Found</h2>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-4 font-semibold text-gray-600 pb-2 text-xs">
                  <span>Target</span>
                  <span>Actual</span>
                  <span>Deviation</span>
                </div>
                {readings.map((reading, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 py-2 border-t text-xs">
                    <span>{reading.target}</span>
                    <span>{reading.actual}</span>
                    <span>{reading.deviation}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold mb-3 text-primary">Definitive</h2>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-4 font-semibold text-gray-600 pb-2 text-xs">
                  <span>Target</span>
                  <span>Actual</span>
                  <span>Deviation</span>
                </div>
                {definitiveReadings.map((reading, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 py-2 border-t text-xs">
                    <span>{reading.target}</span>
                    <span>{reading.actual}</span>
                    <span>{reading.deviation}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <h2 className="text-sm font-semibold mb-1 text-primary">Equipment and Standards Used</h2>
          <p className="text-xs">Test Equipment - Digital Pressure Calibrator - Traceability NAMAS</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <h2 className="text-sm font-semibold mb-1 text-primary">Notes</h2>
          <p className="min-h-[40px] whitespace-pre-wrap text-[11px]">{equipment?.notes}</p>
        </div>

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
            Pressure Equipment Tested according to BS EN 837-1:1998
          </p>
        </div>
      </div>
    </div>
  );
};