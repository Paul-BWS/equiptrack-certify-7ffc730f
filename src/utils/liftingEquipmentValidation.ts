import { toast } from "sonner";

interface LiftingEquipmentReadings {
  date: string;
  retestDate: string;
  model: string;
  serialNumber: string;
  engineer?: string;
  result: string;
}

export const validateLiftingEquipmentForm = (readings: LiftingEquipmentReadings): boolean => {
  if (!readings.date) {
    toast.error("Test date is required");
    return false;
  }

  if (!readings.retestDate) {
    toast.error("Retest date is required");
    return false;
  }

  if (!readings.model) {
    toast.error("Model is required");
    return false;
  }

  if (!readings.serialNumber) {
    toast.error("Serial number is required");
    return false;
  }

  if (!readings.result) {
    toast.error("Result is required");
    return false;
  }

  return true;
};