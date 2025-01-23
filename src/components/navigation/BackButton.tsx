import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  customerId: string;
}

export const BackButton = ({ customerId }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (location.pathname.includes('/equipment')) {
      navigate(`/customers/${customerId}`);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full bg-transparent border border-white hover:bg-white/10"
      onClick={handleBackClick}
    >
      <ArrowLeft className="h-4 w-4 text-white" strokeWidth={2} />
    </Button>
  );
};