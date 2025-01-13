import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ProfileFormProps {
  email: string;
  name: string;
  onNameChange: (value: string) => void;
  onUpdateProfile: () => void;
  isBWSUser: boolean;
  companyName?: string;
}

export const ProfileForm = ({
  email,
  name,
  onNameChange,
  onUpdateProfile,
  isBWSUser,
  companyName,
}: ProfileFormProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          disabled
          className="bg-muted"
        />
      </div>
      {companyName && (
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            type="text"
            id="company"
            value={companyName}
            disabled
            className="bg-muted"
          />
        </div>
      )}
      <Button onClick={onUpdateProfile} className="w-full mt-6">
        Update Profile
      </Button>

      {isBWSUser && (
        <>
          <Separator className="my-6" />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Admin Settings</h3>
            <p className="text-sm text-muted-foreground">
              As a BWS user, you can manage user associations in Supabase.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open('https://supabase.com/dashboard/project/svgiplyjhtsqjeihemfb/auth/users', '_blank')}
            >
              Open User Management
            </Button>
          </div>
        </>
      )}
    </div>
  );
};