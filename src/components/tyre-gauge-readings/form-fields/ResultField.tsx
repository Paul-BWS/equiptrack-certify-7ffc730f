import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ResultFieldProps {
  result: string;
  onResultChange: (value: string) => void;
}

export const ResultField = ({ result, onResultChange }: ResultFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="result" className="text-sm text-[#C8C8C9]">Result</Label>
      <Select 
        value={result} 
        onValueChange={onResultChange}
        name="result"
      >
        <SelectTrigger 
          id="result"
          className="h-12 bg-white border-gray-200 placeholder:text-[#C8C8C9]"
        >
          <SelectValue placeholder="Select result" />
        </SelectTrigger>
        <SelectContent className="bg-white border shadow-lg z-50">
          <SelectItem value="PASS">Pass</SelectItem>
          <SelectItem value="FAIL">Fail</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};