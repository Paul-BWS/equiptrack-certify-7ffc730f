import { OrganizationSettings } from "@/types/settings";

// In a real app, this would be fetched from an API/database
const DEFAULT_SETTINGS: OrganizationSettings = {
  logo: "/placeholder.svg",
  digitalSignature: "/placeholder.svg",
  organizationName: "Your Company Name",
  address: "123 Business Street, City, Country",
  telephone: "+1 234 567 8900",
  email: "contact@company.com",
  website: "www.company.com"
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