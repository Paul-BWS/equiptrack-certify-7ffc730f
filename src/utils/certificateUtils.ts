export const handleCertificatePrint = (
  certNumber: string,
  model?: string,
  serialNumber?: string,
  serviceDate?: string
) => {
  const formattedDate = serviceDate ? new Date(serviceDate).toLocaleDateString('en-GB') : '';
  const filename = `BWS_Certificate_${model || ''}_${serialNumber || ''}_${formattedDate}`.replace(/\s+/g, '_');
  
  // Set the document title which will be used as the default filename
  document.title = filename;
  
  // Create a timestamp for the print
  const timestamp = new Date().toISOString();
  console.log("Printing certificate:", filename, "at", timestamp);

  // Add a small delay to ensure the title is set before printing
  setTimeout(() => {
    window.print();
    
    // Reset the document title after printing
    setTimeout(() => {
      document.title = 'BWS Calibration System';
    }, 100);
  }, 100);
};