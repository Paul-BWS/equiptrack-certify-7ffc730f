import { DialogContent } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { CertificateHeader } from "@/components/certificate/CertificateHeader";
import { EquipmentDetails } from "@/components/certificate/EquipmentDetails";
import { TechnicianStatus } from "@/components/certificate/TechnicianStatus";
import { CertificateFooter } from "@/components/certificate/CertificateFooter";

interface CertificateTemplateProps {
  equipmentId: string | null;
  onClose: () => void;
}

export const CertificateTemplate = ({ equipmentId }: CertificateTemplateProps) => {
  const { data: equipment, isLoading } = useQuery({
    queryKey: ['lifting-equipment-certificate', equipmentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lifting_equipment')
        .select('*')
        .eq('id', equipmentId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!equipmentId,
  });

  if (isLoading || !equipment) {
    return (
      <DialogContent>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DialogContent>
    );
  }

  const serviceRecord = {
    service_date: equipment.last_service_date,
    next_service_date: equipment.next_service_due,
    technician: equipment.engineer || 'N/A'
  };

  const certificate = {
    certification_number: equipment.cert_number || 'N/A',
    issue_date: equipment.last_service_date,
    expiry_date: equipment.next_service_due
  };

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="space-y-6 p-6">
        <CertificateHeader certificate={certificate} />
        
        <EquipmentDetails 
          equipment={{
            id: equipment.id,
            model: equipment.model || 'N/A',
            serial_number: equipment.serial_number || 'N/A',
            last_service_date: equipment.last_service_date,
            next_service_due: equipment.next_service_due
          }} 
          serviceRecord={serviceRecord}
        />

        <TechnicianStatus serviceRecord={serviceRecord} />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Inspection Results</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(equipment)
              .filter(([key]) => key.endsWith('_condition') || key.includes('inspection') || key.includes('levels') || key.includes('operation'))
              .map(([key, value]) => (
                <div key={key} className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm capitalize">{key.replace(/_/g, ' ')}</span>
                  <span className={`text-sm font-medium ${value === 'PASS' ? 'text-green-600' : 'text-red-600'}`}>
                    {value}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <CertificateFooter />
      </div>
    </DialogContent>
  );
};