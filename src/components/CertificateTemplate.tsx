import { Certificate, Equipment, ServiceRecord } from "@/types/equipment";
import { getOrganizationSettings } from "@/utils/settings";

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
  const settings = getOrganizationSettings();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg border-8 border-double border-gray-200" id="certificate">
      {/* Header with Logo and Title */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div className="flex items-center gap-4">
          <img src={settings.logo} alt="Company Logo" className="h-12 w-auto" />
          <div>
            <h1 className="text-lg font-bold text-primary">CALIBRATION CERTIFICATE</h1>
            <p className="text-xs text-gray-600">{settings.inspectionAuthority}</p>
            <p className="text-xs text-gray-600">ISO 9001:2015 Certified</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-base font-semibold text-primary">Certificate No:</p>
          <p className="text-base">{certificate.certificationNumber}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        {/* Equipment Details */}
        <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
          <div className="space-y-3">
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Model</h2>
              <p className="text-sm font-medium">{equipment.model}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Serial Number</h2>
              <p className="text-sm font-medium">{equipment.serialNumber}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Calibration Date</h2>
              <p className="text-sm font-medium">{serviceRecord.date}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Next Due Date</h2>
              <p className="text-sm font-medium">{serviceRecord.nextDueDate}</p>
            </div>
          </div>
        </div>

        {/* Technician & Status */}
        <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase">Engineer</h2>
            <p className="text-sm font-medium">{serviceRecord.technician}</p>
          </div>
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase">Status</h2>
            <p className="text-sm font-medium text-green-600">ACTIVE</p>
          </div>
        </div>

        {/* Measurements */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Min</h2>
              <p className="text-sm font-medium">40</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Max</h2>
              <p className="text-sm font-medium">340</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Units</h2>
              <p className="text-sm font-medium">nm</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase">Result</h2>
              <p className="text-sm font-medium text-green-600">PASS</p>
            </div>
          </div>

          {/* Readings Table */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-sm font-semibold mb-3 text-primary">As Found</h2>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-4 font-semibold text-gray-600 pb-2 text-xs">
                  <span>Target</span>
                  <span>Actual</span>
                  <span>Deviation</span>
                </div>
                {[
                  { target: "40", actual: "38.9", deviation: "-2.8%" },
                  { target: "190", actual: "185.0", deviation: "-2.6%" },
                  { target: "340", actual: "329.0", deviation: "-3.2%" },
                ].map((reading, index) => (
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
                {[
                  { target: "40", actual: "38.9", deviation: "-2.8%" },
                  { target: "190", actual: "185.0", deviation: "-2.6%" },
                  { target: "340", actual: "329.0", deviation: "-3.2%" },
                ].map((reading, index) => (
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

        {/* Notes */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-sm font-semibold mb-2 text-primary">Notes</h2>
          <p className="min-h-[60px] whitespace-pre-wrap text-xs">{serviceRecord.notes}</p>
        </div>

        {/* Digital Signature */}
        <div className="mt-6 flex justify-end items-center gap-4 border-t pt-4">
          <img 
            src={settings.digitalSignature} 
            alt="Digital Signature" 
            className="h-12 w-auto"
          />
          <div className="text-right">
            <p className="text-xs font-medium">{serviceRecord.technician}</p>
            <p className="text-xs text-gray-600">Authorized Signatory</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-gray-600 text-center">
            Torque Equipment Tested according to BS EN ISO 6789:2017 Tolerance +/- 4% of stated load
          </p>
        </div>
      </div>
    </div>
  );
};