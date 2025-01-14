import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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
}: FormFieldProps) => {
  const [dateInputType, setDateInputType] = useState(showCalendar ? "text" : type);

  const handleFocus = () => {
    if (showCalendar) {
      setDateInputType("date");
    }
  };

  const handleBlur = () => {
    if (showCalendar && !value) {
      setDateInputType("text");
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-base text-[#C8C8C9]">{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={dateInputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`text-base bg-white border-gray-200 placeholder:text-[#CCCCCC] ${className}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};