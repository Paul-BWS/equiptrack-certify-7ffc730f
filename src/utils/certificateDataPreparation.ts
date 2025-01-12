export const generateCertificateNumber = () => {
  const prefix = 'BWS';
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `${prefix}-${timestamp}-${randomNum}`;
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
  if (!readings || !equipmentId) {
    throw new Error('Invalid data for certificate preparation');
  }

  return {
    id: generateUUID(),
    torque_wrench_id: equipmentId,
    certification_number: readings.certNumber || generateCertificateNumber(),
    issue_date: readings.date || new Date().toISOString().split('T')[0],
    expiry_date: readings.retestDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
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