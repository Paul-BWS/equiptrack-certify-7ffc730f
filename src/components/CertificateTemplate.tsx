import { Certificate, Equipment, ServiceRecord } from "@/types/equipment";

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
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg" id="certificate">
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-gray-500 mb-1">CERTIFICATE NO</h2>
          <p className="text-xl">{certificate.certificationNumber}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-gray-500 mb-1">DATE</h2>
            <p>{serviceRecord.date}</p>
          </div>
          <div>
            <h2 className="text-gray-500 mb-1">RETEST DATE</h2>
            <p>{serviceRecord.nextDueDate}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-gray-500 mb-1">MODEL</h2>
          <p>{equipment.model}</p>
        </div>
        <div>
          <h2 className="text-gray-500 mb-1">SERIAL NUMBER</h2>
          <p>{equipment.serialNumber}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-gray-500 mb-1">ENGINEER</h2>
          <p>{serviceRecord.technician}</p>
        </div>
        <div>
          <h2 className="text-gray-500 mb-1">STATUS</h2>
          <p className="text-green-500 font-semibold">ACTIVE</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div>
          <h2 className="text-gray-500 mb-1">MIN</h2>
          <p>40</p>
        </div>
        <div>
          <h2 className="text-gray-500 mb-1">MAX</h2>
          <p>340</p>
        </div>
        <div>
          <h2 className="text-gray-500 mb-1">UNITS</h2>
          <p>nm</p>
        </div>
        <div>
          <h2 className="text-gray-500 mb-1">RESULT</h2>
          <p className="text-green-500">PASS</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-gray-500 mb-4">AS FOUND</h2>
            <div className="space-y-4">
              {[
                { target: "40", actual: "38.9", deviation: "-2.8%" },
                { target: "190", actual: "185.0", deviation: "-2.6%" },
                { target: "340", actual: "329.0", deviation: "-3.2%" },
              ].map((reading, index) => (
                <div key={index} className="grid grid-cols-3 gap-4">
                  <p>{reading.target}</p>
                  <p>{reading.actual}</p>
                  <p>{reading.deviation}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-gray-500 mb-4">DEFINITIVE</h2>
            <div className="space-y-4">
              {[
                { target: "40", actual: "38.9", deviation: "-2.8%" },
                { target: "190", actual: "185.0", deviation: "-2.6%" },
                { target: "340", actual: "329.0", deviation: "-3.2%" },
              ].map((reading, index) => (
                <div key={index} className="grid grid-cols-3 gap-4">
                  <p>{reading.target}</p>
                  <p>{reading.actual}</p>
                  <p>{reading.deviation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <p>Torque Equipment Tested according to BS EN ISO 6789:2017 Tolerance +/- 4% of stated load</p>
      </div>

      <div className="mt-8">
        <h2 className="text-gray-500 mb-2">NOTES</h2>
        <div className="border p-4 rounded min-h-[100px]">
          {serviceRecord.notes}
        </div>
      </div>
    </div>
  );
};