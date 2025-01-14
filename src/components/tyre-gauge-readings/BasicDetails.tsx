import { ModelField } from "./form-fields/ModelField";
import { SerialNumberField } from "./form-fields/SerialNumberField";
import { EngineerField } from "./form-fields/EngineerField";
import { ResultField } from "./form-fields/ResultField";

interface BasicDetailsProps {
  model: string;
  serialNumber: string;
  engineer: string;
  result: string;
  onModelChange: (value: string) => void;
  onSerialNumberChange: (value: string) => void;
  onEngineerChange: (value: string) => void;
  onResultChange: (value: string) => void;
}

export const BasicDetails = ({
  model,
  serialNumber,
  engineer,
  result,
  onModelChange,
  onSerialNumberChange,
  onEngineerChange,
  onResultChange,
}: BasicDetailsProps) => {
  return (
    <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModelField
          model={model}
          onModelChange={onModelChange}
        />

        <SerialNumberField
          serialNumber={serialNumber}
          onSerialNumberChange={onSerialNumberChange}
        />

        <EngineerField
          engineer={engineer}
          onEngineerChange={onEngineerChange}
        />

        <ResultField
          result={result}
          onResultChange={onResultChange}
        />
      </div>
    </div>
  );
};