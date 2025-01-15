import { EquipmentList } from "@/components/EquipmentList";

interface BeamsetterListProps {
  beamsetters: Array<{
    id: string;
    model: string;
    serialNumber: string;
    lastServiceDate: string;
    nextServiceDue: string;
  }>;
  onNewBeamsetter: () => void;
  onGenerateCertificate: (id: string) => void;
  onViewReadings: (id: string) => void;
}

export const BeamsetterList = ({
  beamsetters,
  onNewBeamsetter,
  onGenerateCertificate,
  onViewReadings,
}: BeamsetterListProps) => {
  if (!beamsetters.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No beamsetter equipment found</h3>
        <p className="text-muted-foreground mb-4">Get started by adding your first beamsetter equipment.</p>
        <button
          onClick={onNewBeamsetter}
          className="text-primary hover:underline"
        >
          Add Beamsetter
        </button>
      </div>
    );
  }

  return (
    <EquipmentList
      equipment={beamsetters}
      onGenerateCertificate={onGenerateCertificate}
      onViewReadings={onViewReadings}
    />
  );
};