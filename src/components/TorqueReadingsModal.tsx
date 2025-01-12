import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HeaderSection } from "./torque-readings/HeaderSection";
import { useEquipmentData } from "@/hooks/useEquipmentData";
import { LoadingState } from "./torque-readings/LoadingState";
import { toast } from "sonner";
import { useTorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";
import { BasicDetails } from "./torque-readings/form-sections/BasicDetails";
import { ReadingsSection } from "./torque-readings/form-sections/ReadingsSection";
import { NotesSection } from "./torque-readings/form-sections/NotesSection";
import { FormActions } from "./torque-readings/form-sections/FormActions";
import { generateCertificateNumber } from "@/utils/certificateDataPreparation";
import { useTorqueWrenchSubmit } from "@/hooks/useTorqueWrenchSubmit";
import { validateForm } from "@/utils/torqueReadingsValidation";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { handleSave, isSaving } = useTorqueWrenchSubmit(equipmentId, () => {
    toast.success("Torque wrench data saved successfully");
    onOpenChange(false);
  });

  // Generate certificate number for new entries
  if (!equipmentId && !readings.certNumber) {
    setReadings(prev => ({
      ...prev,
      certNumber: generateCertificateNumber()
    }));
  }

  const handleDelete = async () => {
    if (!equipmentId) return;

    try {
      // First, delete all certificates associated with this torque wrench
      const { error: certificatesError } = await supabase
        .from('certificates')
        .delete()
        .eq('torque_wrench_id', equipmentId);

      if (certificatesError) {
        console.error('Error deleting certificates:', certificatesError);
        throw certificatesError;
      }

      // Then delete the torque wrench itself
      const { error: torqueWrenchError } = await supabase
        .from('torque_wrench')
        .delete()
        .eq('id', equipmentId);

      if (torqueWrenchError) {
        console.error('Error deleting torque wrench:', torqueWrenchError);
        throw torqueWrenchError;
      }

      toast.success("Equipment deleted successfully");
      onOpenChange(false);
      window.location.reload();
    } catch (error: any) {
      console.error('Error deleting equipment:', error);
      toast.error("Failed to delete equipment");
    }
  };

  if (error) {
    toast.error("Failed to load equipment data");
    return null;
  }

  if (isLoading) {
    return <LoadingState open={open} onOpenChange={onOpenChange} />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(readings)) {
      return;
    }

    const pathSegments = window.location.pathname.split('/');
    const companyIdIndex = pathSegments.indexOf('customers') + 1;
    const companyId = pathSegments[companyIdIndex];

    const torqueWrenchData = {
      id: equipmentId,
      company_id: companyId,
      model: readings.model,
      serial_number: readings.serialNumber,
      min_torque: parseFloat(readings.min),
      max_torque: parseFloat(readings.max),
      units: readings.units,
      last_service_date: readings.date,
      next_service_due: readings.retestDate,
      engineer: readings.engineer,
      result: readings.result,
      notes: readings.notes,
      readings: readings.readings,
      definitive_readings: readings.definitiveReadings,
      cert_number: readings.certNumber,
      status: readings.status
    };

    try {
      await handleSave(torqueWrenchData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to save torque wrench data");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white p-0">
          <DialogHeader className="p-6 border-b">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-semibold">Torque Wrench Readings</DialogTitle>
              {equipmentId && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="rounded-full bg-destructive hover:bg-destructive/90 h-10 w-10 p-0"
                >
                  <Trash2 className="h-4 w-4 text-destructive-foreground" />
                </Button>
              )}
            </div>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
              isSaving={isSaving}
            />
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the torque wrench
              and all of its associated certificates.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};