export const generateCertificateNumber = () => {
  const prefix = 'BWS';
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}${randomNum}`;
};

export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const calculateDeviation = (target: string, actual: string): string => {
  if (!target || !actual) return "";
  const targetNum = parseFloat(target);
  const actualNum = parseFloat(actual);
  if (isNaN(targetNum) || isNaN(actualNum) || targetNum === 0) return "";
  const deviation = ((actualNum - targetNum) / targetNum) * 100;
  return deviation.toFixed(2);
};

export const prepareCertificateData = (readings: any, equipmentId: string | null) => {
  return {
    id: generateUUID(),
    torque_wrench_id: equipmentId || generateUUID(),
    certification_number: readings.certNumber,
    issue_date: readings.date,
    expiry_date: readings.retestDate
  };
};

export const prepareServiceRecordData = (readings: any, equipmentId: string | null) => {
  return {
    id: generateUUID(),
    torque_wrench_id: equipmentId || generateUUID(),
    service_date: readings.date,
    service_type: 'calibration',
    technician: readings.engineer,
    notes: readings.notes,
    next_service_date: readings.retestDate
  };
};