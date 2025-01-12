import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { HeaderSection } from "./torque-readings/HeaderSection";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import { LoadingState } from "./torque-readings/LoadingState";
import { toast } from "sonner";
import { useTorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";
import { BasicDetails } from "./torque-readings/form-sections/BasicDetails";
import { ReadingsSection } from "./torque-readings/form-sections/ReadingsSection";
import { NotesSection } from "./torque-readings/form-sections/NotesSection";
import { FormActions } from "./torque-readings/form-sections/FormActions";

interface TorqueReadingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}

export const TorqueReadingsModal = ({
  open,
  onOpenChange,
  equipmentId,
}: TorqueReadingsModalProps) => {
  const { data: equipment, isLoading, error } = useEquipmentData(equipmentId, open);
  const { readings, setReadings } = useTorqueReadingsForm(equipment, open);

  if (error) {
    toast.error("Failed to load equipment data");
    return null;
  }

  if (isLoading) {
    return <LoadingState open={open} onOpenChange={onOpenChange} />;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-xl font-semibold">Torque Wrench Readings</DialogTitle>
        </DialogHeader>
        
        <div className="p-6 space-y-6">
          <HeaderSection
            date={readings.date}
            status={readings.status}
            retestDate={readings.retestDate}
            certNumber={readings.certNumber}
            onDateChange={(value) => setReadings({ ...readings, date: value })}
            onRetestDateChange={(value) => setReadings({ ...readings, retestDate: value })}
          />
          
          <BasicDetails
            formData={readings}
            onChange={(field, value) => setReadings(prev => ({ ...prev, [field]: value }))}
          />
          
          <ReadingsSection
            readings={readings.readings}
            definitiveReadings={readings.definitiveReadings}
            onChange={(field, value) => setReadings(prev => ({ ...prev, [field]: value }))}
          />

          <NotesSection
            notes={readings.notes}
            onChange={(notes) => setReadings(prev => ({ ...prev, notes }))}
          />

          <FormActions
            onClose={() => onOpenChange(false)}
            isSaving={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};