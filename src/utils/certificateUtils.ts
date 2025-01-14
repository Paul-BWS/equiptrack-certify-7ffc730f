import { toast } from "sonner";

export const handleCertificatePrint = (certificationNumber: string) => {
  const timestamp = new Date().toISOString();
  console.log("Certificate printed on:", timestamp);
  
  // Set document title for filename
  const originalTitle = document.title;
  document.title = certificationNumber;
  
  window.print();
  
  // Clean up
  document.title = originalTitle;
  
  toast.success(`Certificate ${certificationNumber} printed at ${new Date(timestamp).toLocaleString()}`);
};