export const handleCertificatePrint = (
  certNumber: string,
  model?: string,
  serialNumber?: string,
  serviceDate?: string
) => {
  const timestamp = new Date().toISOString();
  const formattedDate = serviceDate ? new Date(serviceDate).toLocaleDateString('en-GB') : '';
  const filename = `BWS_Certificate_${model || ''}_${serialNumber || ''}_${formattedDate}`.replace(/\s+/g, '_');
  
  const printHandler = () => {
    window.print();
  };

  // Set the document title which will be used as the default filename
  document.title = filename;
  
  // Print the document
  printHandler();
  
  // Reset the document title after printing
  setTimeout(() => {
    document.title = 'BWS Calibration System';
  }, 100);
};