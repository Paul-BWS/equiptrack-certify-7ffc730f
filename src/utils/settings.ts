import { OrganizationSettings } from "@/types/settings";

// In a real app, this would be fetched from an API/database
const DEFAULT_SETTINGS: OrganizationSettings = {
  logo: "/placeholder.svg",
  digitalSignature: "/placeholder.svg",
  organizationName: "Your Company Name",
  inspectionAuthority: "Inspection Authority"
};

export const getOrganizationSettings = (): OrganizationSettings => {
  const savedSettings = localStorage.getItem('organizationSettings');
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
  return DEFAULT_SETTINGS;
};

export const updateOrganizationSettings = (settings: Partial<OrganizationSettings>) => {
  const currentSettings = getOrganizationSettings();
  const newSettings = { ...currentSettings, ...settings };
  localStorage.setItem('organizationSettings', JSON.stringify(newSettings));
  return newSettings;
};