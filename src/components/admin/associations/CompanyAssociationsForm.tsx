import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCompany } from "@/types/admin";
import { useState } from "react";

interface CompanyAssociationsFormProps {
  uniqueUsers: { id: string; email: string; }[] | undefined;
  companies: { id: string; name: string; }[];
  onAssociationAdded: () => void;
}

export const CompanyAssociationsForm = ({
  uniqueUsers,
  companies,
  onAssociationAdded,
}: CompanyAssociationsFormProps) => {
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
      <h3 className="text-lg font-medium">Add New Company Association</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select value={selectedUser} onValueChange={setSelectedUser}>
          <SelectTrigger>
            <SelectValue placeholder="Select user" />
          </SelectTrigger>
          <SelectContent>
            {uniqueUsers?.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCompany} onValueChange={setSelectedCompany}>
          <SelectTrigger>
            <SelectValue placeholder="Select company" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((company) => (
              <SelectItem key={company.id} value={company.id}>
                {company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={() => {
          if (!selectedCompany || !selectedUser) return;
          onAssociationAdded();
          setSelectedCompany("");
          setSelectedUser("");
        }}>
          Add Association
        </Button>
      </div>
    </div>
  );
};