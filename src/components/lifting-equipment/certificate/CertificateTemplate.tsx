import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { CertificateHeader } from "@/components/certificate/CertificateHeader";
import { EquipmentDetails } from "@/components/certificate/EquipmentDetails";
import { TechnicianStatus } from "@/components/certificate/TechnicianStatus";
import { CertificateFooter } from "@/components/certificate/CertificateFooter";

interface CertificateTemplateProps {
  equipmentId: string | null;
}

export const CertificateTemplate = ({ equipmentId }: CertificateTemplateProps) => {
  const { data: equipment, isLoading } = useQuery({
    queryKey: ['lifting-equipment-certificate', equipmentId],
    queryFn: async () => {
      if (!equipmentId) return null;

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
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const serviceRecord = {
    id: equipment.id,
    service_date: equipment.last_service_date,
    next_service_date: equipment.next_service_due,
    technician: equipment.engineer || 'N/A',
    service_type: 'Inspection',
    notes: equipment.notes || ''
  };

  const certificate = {
    id: equipment.id,
    certification_number: equipment.cert_number || 'N/A',
    issue_date: equipment.last_service_date,
    expiry_date: equipment.next_service_due
  };

  const inspectionItems = [
    { key: 'platform_condition', label: 'Check Condition Of Platform' },
    { key: 'control_box_condition', label: 'Check Condition Control Box' },
    { key: 'hydraulic_hoses_condition', label: 'Check Condition Hydraulic Hoses' },
    { key: 'main_structure_inspection', label: 'Visual Inspection Of Main Structure' },
    { key: 'oil_levels', label: 'Check Oil Levels' },
    { key: 'rollers_and_guides', label: 'Check Rollers And Guides' },
    { key: 'safety_mechanism', label: 'Check Safety Mechanism' },
    { key: 'scissor_operation', label: 'Check Scissor Operation' },
    { key: 'securing_bolts', label: 'Check Securing Bolts' },
    { key: 'toe_guards', label: 'Check Toe Guards' },
    { key: 'lubrication_moving_parts', label: 'Check Lubrication Moving Parts' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg border-8 border-double border-gray-200 scale-[0.85] origin-top" id="certificate">
      <CertificateHeader certificate={certificate} />
      
      <div className="space-y-6">
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
          <div className="space-y-2">
            {inspectionItems.map(({ key, label }) => (
              <div key={key} className="grid grid-cols-[2fr,4fr,1fr] gap-4 items-center border border-gray-200">
                <div className="p-3 text-gray-600 text-sm font-medium">
                  {label}
                </div>
                <div className="p-3 border-x border-gray-200 text-sm">
                  {equipment[`${key}_notes`] || ''}
                </div>
                <div className={`p-3 text-center font-medium text-sm ${
                  equipment[key] === 'PASS' 
                    ? 'text-green-600' 
                    : equipment[key] === 'N/A' 
                    ? 'text-gray-500'
                    : 'text-red-600'
                }`}>
                  {equipment[key] || 'N/A'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <h2 className="text-sm font-semibold mb-1 text-primary">Notes</h2>
          <p className="min-h-[40px] whitespace-pre-wrap text-xs">{equipment.notes}</p>
        </div>

        <CertificateFooter />
      </div>
    </div>
  );
};