import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface GroupAssociationsFormProps {
  uniqueUsers: { id: string; email: string; }[] | undefined;
  groups: { id: string; name: string; }[] | undefined;
  onAssociationAdded: () => void;
}

export const GroupAssociationsForm = ({
  uniqueUsers,
  groups,
  onAssociationAdded,
}: GroupAssociationsFormProps) => {
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
      <h3 className="text-lg font-medium">Add New Group Association</h3>
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

        <Select value={selectedGroup} onValueChange={setSelectedGroup}>
          <SelectTrigger>
            <SelectValue placeholder="Select group" />
          </SelectTrigger>
          <SelectContent>
            {groups?.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                {group.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={() => {
          if (!selectedGroup || !selectedUser) return;
          onAssociationAdded();
          setSelectedGroup("");
          setSelectedUser("");
        }}>
          Add Group Association
        </Button>
      </div>
    </div>
  );
};