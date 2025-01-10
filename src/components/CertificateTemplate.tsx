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
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg" id="certificate">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-primary mb-2">
          Test Certificate
        </h1>
        <p className="text-gray-600">Certificate No: {certificate.certificationNumber}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Equipment Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Name:</p>
            <p>{equipment.name}</p>
          </div>
          <div>
            <p className="font-medium">Serial Number:</p>
            <p>{equipment.serialNumber}</p>
          </div>
          <div>
            <p className="font-medium">Manufacturer:</p>
            <p>{equipment.manufacturer}</p>
          </div>
          <div>
            <p className="font-medium">Model:</p>
            <p>{equipment.model}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Service Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Service Date:</p>
            <p>{serviceRecord.date}</p>
          </div>
          <div>
            <p className="font-medium">Service Type:</p>
            <p className="capitalize">{serviceRecord.type}</p>
          </div>
          <div>
            <p className="font-medium">Technician:</p>
            <p>{serviceRecord.technician}</p>
          </div>
          <div>
            <p className="font-medium">Next Due Date:</p>
            <p>{serviceRecord.nextDueDate}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="border-t-2 border-gray-400 w-48 mt-8"></div>
            <p className="mt-2">Authorized Signature</p>
          </div>
          <div className="text-right">
            <p className="font-medium">Issue Date: {certificate.issueDate}</p>
            <p className="font-medium">Valid Until: {certificate.expiryDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};