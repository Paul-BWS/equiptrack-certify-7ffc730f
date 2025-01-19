import { Button } from "@/components/ui/button";
import { Grid, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  id: string;
}

export const DashboardHeader = ({ id }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#4c6fbf]">
      <div className="container mx-auto py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-white hover:text-white hover:bg-white/20 border border-white"
            >
              <Users className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/customers/${id}/equipment`)}
              className="text-white hover:text-white hover:bg-white/20 border border-white"
              title="Go to Equipment List"
            >
              <Grid className="h-5 w-5" />
            </Button>
          </div>
          <h1 className="text-2xl font-semibold text-white">Company Details</h1>
        </div>
      </div>
    </div>
  );
};