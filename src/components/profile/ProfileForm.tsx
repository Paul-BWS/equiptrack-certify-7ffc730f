import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CompanySelect } from "./CompanySelect";
import { Company } from "@/types/company";

interface ProfileFormProps {
  email: string;
  name: string;
  onNameChange: (value: string) => void;
  companies: Company[];
  selectedCompany: string;
  onCompanyChange: (value: string) => void;
  onUpdateProfile: () => void;
}

export const ProfileForm = ({
  email,
  name,
  onNameChange,
  companies,
  selectedCompany,
  onCompanyChange,
  onUpdateProfile,
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
    </div>
  );
};