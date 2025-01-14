import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InspectionItem {
  key: string;
  label: string;
}

interface InspectionChecklistProps {
  items: readonly InspectionItem[];
  values: Partial<Record<string, string>>;
  onFieldChange: (field: string, value: string) => void;
}

export const InspectionChecklist = ({
  items,
  values,
  onFieldChange,
}: InspectionChecklistProps) => {
  return (
    <div className="space-y-4 bg-[#F9F9F9] p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Inspection Checklist</h3>
      <div className="space-y-4">
        {items.map(({ key, label }) => (
          <div key={key} className="grid grid-cols-1 md:grid-cols-[2fr,3fr,1fr] gap-4 items-center">
            <span className="text-gray-500">{label}</span>
            <input
              type="text"
              placeholder="Enter description"
              className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
            />
            <Select 
              value={values[key]} 
              onValueChange={(value) => onFieldChange(key, value)}
            >
              <SelectTrigger className="h-12 bg-white border-gray-200">
                <SelectValue placeholder="Result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PASS">Pass</SelectItem>
                <SelectItem value="FAIL">Fail</SelectItem>
                <SelectItem value="RECTIFY">Rectify</SelectItem>
                <SelectItem value="N/A">N/A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
};