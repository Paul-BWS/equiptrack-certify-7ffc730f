export interface BeamsetterFormData {
  certNumber: string;
  model: string;
  serialNumber: string;
  engineer: string;
  status: string;
  notes: string;
  lastServiceDate: Date;
}

export interface BeamsetterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string | null;
}