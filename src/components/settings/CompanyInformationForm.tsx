import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrganizationSettings } from "@/types/settings";

interface CompanyInformationFormProps {
  settings: OrganizationSettings;
  setSettings: (settings: OrganizationSettings) => void;
}

export function CompanyInformationForm({ settings, setSettings }: CompanyInformationFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="organizationName">Organization Name</Label>
          <Input
            id="organizationName"
            value={settings.organizationName}
            onChange={(e) => setSettings({ ...settings, organizationName: e.target.value })}
            placeholder="Enter organization name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            placeholder="Enter company address"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telephone">Telephone</Label>
          <Input
            id="telephone"
            value={settings.telephone}
            onChange={(e) => setSettings({ ...settings, telephone: e.target.value })}
            placeholder="Enter telephone number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={settings.email}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            placeholder="Enter company email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={settings.website}
            onChange={(e) => setSettings({ ...settings, website: e.target.value })}
            placeholder="Enter company website"
          />
        </div>
      </CardContent>
    </Card>
  );
}