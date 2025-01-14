import { toast } from "sonner";
import { TorqueReadingsForm } from "@/hooks/useTorqueReadingsForm";

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

  // Validate readings
  for (let i = 1; i <= 3; i++) {
    const target = formData[`target${i}` as keyof TorqueReadingsForm];
    const actual = formData[`actual${i}` as keyof TorqueReadingsForm];
    
    if (!target || !actual) {
      toast.error(`Reading ${i} must have both target and actual values`);
      return false;
    }
  }

  return true;
};