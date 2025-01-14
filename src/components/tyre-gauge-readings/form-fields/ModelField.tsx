import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ModelFieldProps {
  model: string;
  onModelChange: (value: string) => void;
}

export const ModelField = ({ model, onModelChange }: ModelFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="model" className="text-sm text-[#C8C8C9]">Model</Label>
      <Input
        id="model"
        value={model}
        onChange={(e) => onModelChange(e.target.value)}
        placeholder="e.g. Halfords"
        className="h-12 bg-white border-gray-200 placeholder:text-[#C8C8C9]"
      />
    </div>
  );
};