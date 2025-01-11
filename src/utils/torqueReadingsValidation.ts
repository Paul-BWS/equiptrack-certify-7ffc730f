import { toast } from "sonner";

export interface ReadingsFormData {
  date: string;
  retestDate: string;
  model: string;
  serialNumber: string;
  engineer: string;
  min: string;
  max: string;
  units: string;
  readings: Array<{ target: string; actual: string }>;
}

export const validateReadings = (readings: Array<{ target: string; actual: string }>) => {
  return readings.every(reading => reading.target && reading.actual);
};

export const validateForm = (formData: ReadingsFormData): boolean => {
  const requiredFields = {
    date: "Test Date",
    retestDate: "Retest Date",
    model: "Model",
    serialNumber: "Serial Number",
    engineer: "Engineer",
    min: "Min",
    max: "Max",
    units: "Units"
  };

  for (const [field, label] of Object.entries(requiredFields)) {
    if (!formData[field as keyof ReadingsFormData]) {
      toast.error(`${label} is required`);
      return false;
    }
  }

  if (!validateReadings(formData.readings)) {
    toast.error("All readings (target and actual) must be filled");
    return false;
  }

  return true;
};