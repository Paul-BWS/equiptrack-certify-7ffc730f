import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrganizationSettings } from "@/types/settings";

interface MediaUploadFormProps {
  settings: OrganizationSettings;
  setSettings: (settings: OrganizationSettings) => void;
}

export function MediaUploadForm({ settings, setSettings }: MediaUploadFormProps) {
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({ ...settings, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({ ...settings, digitalSignature: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Media</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="logo">Company Logo</Label>
            <div className="mt-2 flex items-center gap-4">
              {settings.logo && (
                <img src={settings.logo} alt="Company Logo" className="h-12 w-auto object-contain" />
              )}
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="signature">Digital Signature</Label>
            <div className="mt-2 flex items-center gap-4">
              {settings.digitalSignature && (
                <img src={settings.digitalSignature} alt="Digital Signature" className="h-12 w-auto object-contain" />
              )}
              <Input
                id="signature"
                type="file"
                accept="image/*"
                onChange={handleSignatureChange}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}