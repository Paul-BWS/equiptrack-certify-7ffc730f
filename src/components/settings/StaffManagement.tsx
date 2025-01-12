import { useStaffMembers } from "@/hooks/useStaffMembers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";

export const StaffManagement = () => {
  const { data: staff, isLoading, refetch } = useStaffMembers();
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    role: "ENGINEER",
  });

  const handleAddStaff = async () => {
    if (!newStaff.name || !newStaff.email || !newStaff.role) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { data: companyData } = await supabase
        .from('companies')
        .select('id')
        .eq('name', 'BWS')
        .single();

      if (!companyData) {
        toast.error("Company not found");
        return;
      }

      const { error } = await supabase
        .from('staff')
        .insert([
          {
            name: newStaff.name,
            email: newStaff.email,
            role: newStaff.role,
            company_id: companyData.id,
          },
        ]);

      if (error) throw error;

      toast.success("Staff member added successfully");
      setNewStaff({ name: "", email: "", role: "ENGINEER" });
      refetch();
    } catch (error) {
      console.error('Error adding staff:', error);
      toast.error("Failed to add staff member");
    }
  };

  const handleDeleteStaff = async (id: string) => {
    try {
      const { error } = await supabase
        .from('staff')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success("Staff member removed successfully");
      refetch();
    } catch (error) {
      console.error('Error removing staff:', error);
      toast.error("Failed to remove staff member");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold">Add New Staff Member</h2>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newStaff.name}
              onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
              placeholder="Enter staff name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={newStaff.email}
              onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
              placeholder="Enter email address"
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select
              value={newStaff.role}
              onValueChange={(value) => setNewStaff({ ...newStaff, role: value })}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ENGINEER">Engineer</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="MANAGER">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAddStaff}>Add Staff Member</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Current Staff Members</h2>
          <div className="divide-y">
            {staff?.map((member) => (
              <div
                key={member.id}
                className="py-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                  <p className="text-xs text-gray-400">{member.role}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteStaff(member.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};