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
    service_record_id: `sr-${readings.certNumber}`,
    equipment_id: equipmentId || undefined,
    certification_number: readings.certNumber,
    issue_date: readings.date,
    expiry_date: readings.retestDate
  };
};

export const prepareEquipmentData = (readings: any, equipmentId: string | null) => {
  // Extract company_id from the URL path
  const pathSegments = window.location.pathname.split('/');
  const companyIdIndex = pathSegments.indexOf('customers') + 1;
  const companyId = pathSegments[companyIdIndex];
  
  console.log('Preparing equipment data with company_id:', companyId);
  
  return {
    id: equipmentId || generateUUID(),
    name: `Torque Wrench ${readings.model}`,
    manufacturer: 'Unknown',
    model: readings.model,
    serial_number: readings.serialNumber,
    purchase_date: new Date().toISOString(),
    last_service_date: readings.date,
    next_service_due: readings.retestDate,
    company_id: companyId
  };
};

export const prepareServiceRecordData = (readings: any, equipmentId: string | null) => {
  return {
    id: generateUUID(),
    equipment_id: equipmentId || undefined,
    service_date: readings.date, // Updated from date to service_date
    service_type: 'calibration', // Updated from type to service_type
    technician: readings.engineer,
    notes: readings.notes,
    next_service_date: readings.retestDate // Updated from next_due_date to next_service_date
  };
};