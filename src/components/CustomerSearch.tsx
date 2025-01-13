import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CustomerSearchProps {
  onSearch: (query: string) => void;
}

export const CustomerSearch = ({ onSearch }: CustomerSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
      <Input
        placeholder="Search customers..."
        className="pl-12 h-12 text-base rounded-xl border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};