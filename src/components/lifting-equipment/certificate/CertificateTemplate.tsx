import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { getOrganizationSettings } from "@/utils/settings";

interface CertificateTemplateProps {
  equipmentId: string | null;
}

export const CertificateTemplate = ({ equipmentId }: CertificateTemplateProps) => {
  const settings = getOrganizationSettings();
  
  const { data: equipment, isLoading } = useQuery({
    queryKey: ['lifting-equipment-certificate', equipmentId],
    queryFn: async () => {
      if (!equipmentId) return null;

      const { data, error } = await supabase
        .from('lifting_equipment')
        .select('*, companies(*)')
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

  const inspectionItems = [
    { key: 'platform_condition', label: 'Check Condition Of Platform' },
    { key: 'control_box_condition', label: 'Check Condition Control Box' },
    { key: 'hydraulic_hoses_condition', label: 'Check Condition Hydraulic System' },
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg border-8 border-double border-gray-200" id="certificate">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div className="flex items-center gap-4">
          <img src={settings.logo} alt="Company Logo" className="h-16 w-auto" />
          <div>
            <h1 className="text-xl font-bold text-primary">Report Of Thorough LOLER Examination</h1>
          </div>
        </div>
        <div className="text-right">
          <p className="text-base font-semibold text-primary">Certificate No:</p>
          <p className="text-base">{equipment.cert_number}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-primary mb-2">Customer</h2>
          <p className="text-sm">{equipment.companies?.name}</p>
          <p className="text-sm">{equipment.companies?.address}</p>
        </div>
        
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-gray-600">Equipment</p>
              <p className="text-sm">{equipment.model}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Equipment Serial</p>
              <p className="text-sm">{equipment.serial_number}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-gray-600">Capacity</p>
              <p className="text-sm">{equipment.capacity} {equipment.units}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Safe To Operate</p>
              <p className="text-sm font-semibold">{equipment.status || 'PASS'}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-gray-600">Inspection Date</p>
              <p className="text-sm">{new Date(equipment.last_service_date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Next Due Date</p>
              <p className="text-sm">{new Date(equipment.next_service_due).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-primary mb-2">Inspection Checklist</h3>
        <div className="grid grid-cols-[2fr,3fr,1fr] gap-2 mb-2">
          <h3 className="text-sm font-semibold">Action Performed</h3>
          <h3 className="text-sm font-semibold">Action Notes</h3>
          <h3 className="text-sm font-semibold text-center">Results</h3>
        </div>
        
        {inspectionItems.map(({ key, label }) => (
          <div key={key} className="grid grid-cols-[2fr,3fr,1fr] gap-2 py-1 border-t border-gray-100">
            <p className="text-xs text-gray-600">{label}</p>
            <p className="text-xs">{equipment[`${key}_notes`] || ''}</p>
            <p className="text-xs text-center font-medium">
              {equipment[key] || 'N/A'}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-primary mb-2">Observations / Additional Comments</h3>
        <p className="text-xs min-h-[40px] p-2 bg-gray-50 rounded">
          {equipment.notes || 'No additional comments'}
        </p>
      </div>

      <div className="text-xs space-y-4 mb-6">
        <p>
          The above equipment has been thoroughly inspected. To be legally compliant with The lifting Operations 
          and Lifting Equipment Regulations 1988 Regulation 9/3 and must be thoroughly examined at least every 
          12 months. (6 months recommended for vehicle lifts)
        </p>
        <p>
          Safe to operate No = defects which could cause a danger to persons. Remedial= identification of parts that 
          require rectification but still safe to operate. Yes = Safe to operate.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-6 border-t pt-4">
        <div className="space-y-2">
          <div>
            <p className="text-xs text-gray-600">Inspector's name</p>
            <p className="text-sm">{equipment.engineer}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Qualifications</p>
            <p className="text-sm">HNC Electrical Mechanical Engineering</p>
            <p className="text-sm">Employee BWS Ltd</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end justify-between">
          <div className="text-right space-y-1">
            <p className="text-sm font-semibold">Basic Welding Service LTD</p>
            <p className="text-xs">232 Briscoe lane</p>
            <p className="text-xs">Manchester</p>
            <p className="text-xs">M40 2XG</p>
            <p className="text-xs">0161 223 1843</p>
          </div>
        </div>
      </div>

      <div className="text-center text-xs border-t pt-4">
        Web - www.basicwelding.co.uk - Email - sales@basicwelding.co.uk
      </div>
    </div>
  );
};