import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
  className?: string;
  showCalendar?: boolean;
}

export const FormField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  readOnly,
  className,
  showCalendar,
}: FormFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-[#C8C8C9] text-sm">{label}</Label>
    <div className="relative">
      <Input
        id={id}
        type={showCalendar ? "date" : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`text-sm bg-[#F9F9F9] w-40 ${className}`}
      />
    </div>
  </div>
);