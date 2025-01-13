import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SearchFiltersProps {
  searchCompany: string;
  setSearchCompany: (value: string) => void;
  searchEquipmentType: string;
  setSearchEquipmentType: (value: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export const SearchFilters = ({
  searchCompany,
  setSearchCompany,
  searchEquipmentType,
  setSearchEquipmentType,
  date,
  setDate,
}: SearchFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by company..."
          value={searchCompany}
          onChange={(e) => setSearchCompany(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by equipment type..."
          value={searchEquipmentType}
          onChange={(e) => setSearchEquipmentType(e.target.value)}
          className="pl-10"
        />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};