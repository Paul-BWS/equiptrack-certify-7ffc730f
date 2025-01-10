import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { EquipmentList } from "@/components/EquipmentList";
import { CertificateTemplate } from "@/components/CertificateTemplate";
import { Button } from "@/components/ui/button";
import { Equipment, ServiceRecord, Certificate } from "@/types/equipment";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

// Sample data - in a real app, this would come from a backend
const sampleEquipment: Equipment[] = [
  {
    id: "1",
    name: "Digital Multimeter",
    serialNumber: "DMM-2024-001",
    manufacturer: "Fluke",
    model: "87V",
    purchaseDate: "2024-01-15",
    lastServiceDate: "2024-03-01",
    nextServiceDue: "2024-09-01",
  },
  {
    id: "2",
    name: "Oscilloscope",
    serialNumber: "OSC-2024-002",
    manufacturer: "Tektronix",
    model: "TBS1052B",
    purchaseDate: "2023-11-20",
    lastServiceDate: "2024-02-15",
    nextServiceDue: "2024-08-15",
  },
];

const sampleServiceRecord: ServiceRecord = {
  id: "1",
  equipmentId: "1",
  date: "2024-03-01",
  type: "calibration",
  technician: "John Smith",
  notes: "Annual calibration performed",
  nextDueDate: "2024-09-01",
};

const sampleCertificate: Certificate = {
  id: "1",
  serviceRecordId: "1",
  equipmentId: "1",
  issueDate: "2024-03-01",
  expiryDate: "2024-09-01",
  certificationNumber: "CERT-2024-001",
};

const Index = () => {
  const [showCertificate, setShowCertificate] = useState(false);
  const { toast } = useToast();

  const handleGenerateCertificate = (equipmentId: string) => {
    setShowCertificate(true);
  };

  const handlePrintCertificate = () => {
    window.print();
    toast({
      title: "Certificate Ready",
      description: "The certificate has been sent to your printer.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Equipment Management
          </h1>
          <p className="text-gray-600">
            Manage your equipment service records and certificates
          </p>
        </div>

        <EquipmentList
          equipment={sampleEquipment}
          onGenerateCertificate={handleGenerateCertificate}
        />

        <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
          <DialogContent className="max-w-4xl">
            <CertificateTemplate
              certificate={sampleCertificate}
              equipment={sampleEquipment[0]}
              serviceRecord={sampleServiceRecord}
            />
            <div className="mt-4 flex justify-end">
              <Button onClick={handlePrintCertificate}>Print Certificate</Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Index;