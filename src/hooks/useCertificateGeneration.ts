import { useState } from "react";
import { TorqueWrench, ServiceRecord } from "@/types/equipment";
import { prepareCertificateData } from "@/utils/certificateDataPreparation";

export const useCertificateGeneration = (equipmentId: string | null) => {
  const [showCertificate, setShowCertificate] = useState(false);

  const generateCertificate = (torqueWrenchData: TorqueWrench, serviceRecord: ServiceRecord) => {
    setShowCertificate(true);
    return prepareCertificateData(torqueWrenchData, equipmentId);
  };

  return {
    showCertificate,
    setShowCertificate,
    generateCertificate,
  };
};