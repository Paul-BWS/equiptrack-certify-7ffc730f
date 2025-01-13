import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface EquipmentListHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const EquipmentListHeader = ({
  searchQuery,
  onSearchChange,
}: EquipmentListHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <h1 className="text-2xl font-bold">Equipment List</h1>
      <div className="flex w-full md:w-auto gap-2">
        <div className="relative flex-1 md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>
    </div>
  );
};