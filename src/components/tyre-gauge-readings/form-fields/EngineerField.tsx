import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStaffMembers } from "@/hooks/useStaffMembers";
import { Loader2 } from "lucide-react";

interface EngineerFieldProps {
  engineer: string;
  onEngineerChange: (value: string) => void;
}

export const EngineerField = ({ engineer, onEngineerChange }: EngineerFieldProps) => {
  const { data: staff, isLoading: isLoadingStaff } = useStaffMembers();

  return (
    <div className="space-y-2">
      <Label htmlFor="engineer" className="text-sm text-[#C8C8C9]">Engineer</Label>
      <Select 
        value={engineer} 
        onValueChange={onEngineerChange}
        name="engineer"
      >
        <SelectTrigger 
          id="engineer"
          className="h-12 bg-white border-gray-200 placeholder:text-[#C8C8C9]"
        >
          {isLoadingStaff ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading engineers...</span>
            </div>
          ) : (
            <SelectValue placeholder="Select an engineer" />
          )}
        </SelectTrigger>
        <SelectContent className="bg-white border shadow-lg z-50">
          {staff?.map((engineer) => (
            <SelectItem 
              key={engineer.id} 
              value={engineer.name}
              className="cursor-pointer"
            >
              {engineer.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};