export const generateCertificateNumber = () => {
  const prefix = 'BWS';
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}${randomNum}`;
};

export const calculateDeviation = (target: string, actual: string): string => {
  if (!target || !actual) return "";
  const targetNum = parseFloat(target);
  const actualNum = parseFloat(actual);
  if (isNaN(targetNum) || isNaN(actualNum) || targetNum === 0) return "";
  const deviation = ((actualNum - targetNum) / targetNum) * 100;
  return deviation.toFixed(2);
};

export const prepareCertificateData = (readings: any, equipmentId: string) => {
  return {
    id: `cert-${readings.certNumber}`,
    serviceRecordId: `sr-${readings.certNumber}`,
    equipmentId: equipmentId || 'unknown',
    certificationNumber: readings.certNumber,
    issueDate: readings.date,
    expiryDate: readings.retestDate
  };
};

export const prepareEquipmentData = (readings: any, equipmentId: string) => {
  return {
    id: equipmentId || 'unknown',
    name: `Torque Wrench ${readings.model}`,
    manufacturer: 'Unknown',
    model: readings.model,
    serialNumber: readings.serialNumber,
    purchaseDate: new Date().toISOString(),
    lastServiceDate: readings.date,
    nextServiceDue: readings.retestDate
  };
};

export const prepareServiceRecordData = (readings: any, equipmentId: string) => {
  return {
    id: `sr-${readings.certNumber}`,
    equipmentId: equipmentId || 'unknown',
    date: readings.date,
    type: 'calibration' as const,
    technician: readings.engineer,
    notes: readings.notes,
    nextDueDate: readings.retestDate
  };
};