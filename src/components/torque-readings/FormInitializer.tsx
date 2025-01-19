import { useEffect, useRef } from "react";
import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";
import { Dispatch, SetStateAction } from "react";
import { supabase } from "@/lib/supabase";

interface FormInitializerProps {
  equipmentId: string | null;
  open: boolean;
  setReadings: Dispatch<SetStateAction<TorqueReadingsForm>>;
}

export const FormInitializer = ({ equipmentId, open, setReadings }: FormInitializerProps) => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    const initializeForm = async () => {
      if (!equipmentId && open && !hasInitialized.current) {
        try {
          // Use the Supabase function to get the next certificate number
          const { data: certNumber, error } = await supabase
            .rpc('get_next_certificate_number');

          if (error) throw error;

          setReadings(prev => ({
            ...prev,
            certNumber: certNumber
          }));
          
          hasInitialized.current = true;
        } catch (error) {
          console.error('Error getting certificate number:', error);
        }
      }
    };

    initializeForm();

    // Reset the ref when the modal closes
    if (!open) {
      hasInitialized.current = false;
    }
  }, [equipmentId, open, setReadings]);

  return null;
};