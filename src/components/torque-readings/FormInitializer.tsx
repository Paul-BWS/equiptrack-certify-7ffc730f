import { useEffect, useRef } from "react";
import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";
import { Dispatch, SetStateAction } from "react";

interface FormInitializerProps {
  equipmentId: string | null;
  open: boolean;
  setReadings: Dispatch<SetStateAction<TorqueReadingsForm>>;
}

export const FormInitializer = ({ equipmentId, open, setReadings }: FormInitializerProps) => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!equipmentId && open && !hasInitialized.current) {
      const timestamp = new Date().getTime();
      const randomNum = Math.floor(Math.random() * 1000);
      const newCertNumber = `BWS-${timestamp}-${randomNum}`;
      
      setReadings(prev => ({
        ...prev,
        certNumber: newCertNumber
      }));
      
      hasInitialized.current = true;
    }

    // Reset the ref when the modal closes
    if (!open) {
      hasInitialized.current = false;
    }
  }, [equipmentId, open, setReadings]);

  return null;
};