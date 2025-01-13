import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CompanySelect } from "./CompanySelect";
import { Company } from "@/types/company";
import { Separator } from "@/components/ui/separator";

interface ProfileFormProps {
  email: string;
  name: string;
  onNameChange: (value: string) => void;
  companies: Company[];
  selectedCompany: string;
  onCompanyChange: (value: string) => void;
  onUpdateProfile: () => void;
  isBWSUser: boolean;
}

export const ProfileForm = ({
  email,
  name,
  onNameChange,
  companies,
  selectedCompany,
  onCompanyChange,
  onUpdateProfile,
  isBWSUser,
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
      <CompanySelect
        companies={companies}
        selectedCompany={selectedCompany}
        onCompanyChange={onCompanyChange}
      />
      <Button onClick={onUpdateProfile} className="w-full mt-6">
        Update Profile
      </Button>

      {isBWSUser && (
        <>
          <Separator className="my-6" />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Admin Settings</h3>
            <p className="text-sm text-muted-foreground">
              As a BWS user, you have access to additional administrative features.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.location.href = '/admin/users'}
            >
              Manage User Associations
            </Button>
          </div>
        </>
      )}
    </div>
  );
};