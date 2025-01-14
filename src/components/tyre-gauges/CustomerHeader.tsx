interface CustomerHeaderProps {
  customerName?: string;
}

export const CustomerHeader = ({ customerName }: CustomerHeaderProps) => {
  if (!customerName) return null;
  
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-3xl font-bold">
        {customerName}
      </h1>
    </div>
  );
};