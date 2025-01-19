import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useCertificateNumber = (equipmentId: string | null, isOpen: boolean) => {
  const [certNumber, setCertNumber] = useState<string>("");

  useEffect(() => {
    const fetchCertNumber = async () => {
      if (!equipmentId && isOpen) {
        try {
          const { data: newCertNumber, error } = await supabase
            .rpc('get_next_certificate_number');
          
          if (error) {
            console.error('Error fetching certificate number:', error);
            throw error;
          }
          
          setCertNumber(newCertNumber);
        } catch (error) {
          console.error('Error fetching certificate number:', error);
          toast.error("Failed to generate certificate number");
        }
      }
    };

    fetchCertNumber();
  }, [equipmentId, isOpen]);

  return { certNumber, setCertNumber };
};