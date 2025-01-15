import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";

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
      // Convert 'beam-setter' to 'beamsetter' for the route
      const routeType = type === 'beam-setter' ? 'beamsetter' : type;
      navigate(`/customers/${customerId}/equipment/${routeType}`);
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