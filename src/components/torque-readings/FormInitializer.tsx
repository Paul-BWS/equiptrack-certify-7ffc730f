import { useEffect } from "react";
import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";
import { Dispatch, SetStateAction } from "react";

interface FormInitializerProps {
  equipmentId: string | null;
  open: boolean;
  setReadings: Dispatch<SetStateAction<TorqueReadingsForm>>;
}

export const FormInitializer = ({ equipmentId, open, setReadings }: FormInitializerProps) => {
  useEffect(() => {
    if (!equipmentId && open) {
      const timestamp = new Date().getTime();
      const randomNum = Math.floor(Math.random() * 1000);
      const newCertNumber = `BWS-${timestamp}-${randomNum}`;
      setReadings(prev => ({
        ...prev,
        certNumber: newCertNumber
      }));
    }
  }, [equipmentId, open, setReadings]);

  return null;
};