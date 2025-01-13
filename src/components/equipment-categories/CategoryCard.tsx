import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface CategoryProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  type: string;
}

export const CategoryCard = ({ icon, title, description, type }: CategoryProps) => {
  const navigate = useNavigate();
  const { customerId } = useParams();

  const handleClick = () => {
    if (customerId) {
      navigate(`/customers/${customerId}/equipment/${type}`);
    }
  };

  return (
    <Card
      className="p-6 cursor-pointer hover:bg-accent transition-colors"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="p-2 rounded-full bg-white border-2 border-primary">
          <div className="text-primary">{icon}</div>
        </div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
};