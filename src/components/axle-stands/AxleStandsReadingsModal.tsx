import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { BasicDetails } from "@/components/axle-stands/readings-form/BasicDetails";
import { CertificateSection } from "@/components/axle-stands/readings-form/CertificateSection";
import { NotesSection } from "@/components/axle-stands/readings-form/NotesSection";
import { FormActions } from "@/components/axle-stands/readings-form/FormActions";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";

interface AxleStandsReadingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}

export const AxleStandsReadingsModal = ({
  open,
  onOpenChange,
  equipmentId,
}: AxleStandsReadingsModalProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    model: "",
    serialNumber: "",
    engineer: "",
    result: "PASS",
    date: new Date().toISOString().split('T')[0],
    retestDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    certNumber: generateCertificateNumber(),
    status: "ACTIVE",
    notes: "",
  });

  const { data: equipment } = useQuery({
    queryKey: ['axle-stand', equipmentId],
    queryFn: async () => {
      if (!equipmentId) return null;
      
      const { data, error } = await supabase
        .from('axle_stands')
        .select('*')
        .eq('id', equipmentId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!equipmentId && open,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const pathSegments = window.location.pathname.split('/');
      const companyIdIndex = pathSegments.indexOf('customers') + 1;
      const companyId = pathSegments[companyIdIndex];

      const axleStandData = {
        id: equipmentId,
        company_id: companyId,
        model: formData.model,
        serial_number: formData.serialNumber,
        engineer: formData.engineer,
        last_service_date: formData.date,
        next_service_due: formData.retestDate,
        result: formData.result,
        cert_number: formData.certNumber,
        status: formData.status,
        notes: formData.notes,
      };

      if (equipmentId) {
        const { error } = await supabase
          .from('axle_stands')
          .update(axleStandData)
          .eq('id', equipmentId);

        if (error) throw error;
        toast.success("Axle stand updated successfully");
      } else {
        const { error } = await supabase
          .from('axle_stands')
          .insert([axleStandData]);

        if (error) throw error;
        toast.success("Axle stand created successfully");
      }

      onOpenChange(false);
    } catch (error) {
      console.error('Error saving axle stand:', error);
      toast.error("Failed to save axle stand");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <BasicDetails
            model={formData.model}
            serialNumber={formData.serialNumber}
            engineer={formData.engineer}
            result={formData.result}
            onModelChange={(value) => setFormData({ ...formData, model: value })}
            onSerialNumberChange={(value) => setFormData({ ...formData, serialNumber: value })}
            onEngineerChange={(value) => setFormData({ ...formData, engineer: value })}
            onResultChange={(value) => setFormData({ ...formData, result: value })}
          />

          <CertificateSection
            date={formData.date}
            retestDate={formData.retestDate}
            certNumber={formData.certNumber}
            status={formData.status}
            onDateChange={(value) => setFormData({ ...formData, date: value })}
            onRetestDateChange={(value) => setFormData({ ...formData, retestDate: value })}
            onStatusChange={(value) => setFormData({ ...formData, status: value })}
          />

          <NotesSection
            notes={formData.notes}
            onChange={(value) => setFormData({ ...formData, notes: value })}
          />

          <FormActions
            onCancel={() => onOpenChange(false)}
            onDelete={equipmentId ? () => {/* Implement delete logic */} : undefined}
            isSaving={isSaving}
            showDelete={!!equipmentId}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};