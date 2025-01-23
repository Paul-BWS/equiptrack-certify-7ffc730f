import { Button } from "@/components/ui/button";
import { Grid, Users, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  id: string;
}

export const DashboardHeader = ({ id }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#4c6fbf]">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="rounded-full text-white hover:text-white hover:bg-white/20 border border-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-white">Company Details</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate(`/customers/${id}/equipment`)}
              className="text-white hover:text-white hover:bg-white/20 border border-white rounded-full"
            >
              <Grid className="mr-2 h-5 w-5" />
              Equipment List
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/20 border border-white rounded-full"
            >
              <Users className="mr-2 h-5 w-5" />
              Personnel List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};