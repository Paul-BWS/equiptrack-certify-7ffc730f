import { toast } from "sonner";
import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";
import { Reading } from "@/types/equipment";

export const validateReadings = (readings: Array<Reading>) => {
  if (!Array.isArray(readings)) {
    console.error('Readings is not an array:', readings);
    return false;
  }

  // Check if all readings have both target and actual values filled
  const hasEmptyValues = readings.some(reading => {
    const target = reading.target?.trim() || '';
    const actual = reading.actual?.trim() || '';
    return target === '' || actual === '';
  });

  return !hasEmptyValues;
};

export const validateForm = (formData: TorqueReadingsForm): boolean => {
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
    if (!formData[field as keyof TorqueReadingsForm]) {
      toast.error(`${label} is required`);
      return false;
    }
  }

  // Parse the readings if they're stored as a string
  const readingsArray = Array.isArray(formData.readings) 
    ? formData.readings 
    : JSON.parse(formData.readings as unknown as string);

  if (!validateReadings(readingsArray)) {
    toast.error("All readings (target and actual) must be filled");
    return false;
  }

  return true;
};