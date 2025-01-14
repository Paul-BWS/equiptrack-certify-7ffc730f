import { Button } from "@/components/ui/button";
import { Users, ClipboardList, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface DashboardHeaderProps {
  id: string;
}

export const DashboardHeader = ({ id }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  const { data: isBWSUser } = useQuery({
    queryKey: ['is-bws-user'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('is_bws_user');
      if (error) {
        console.error('Error checking BWS user status:', error);
        return false;
      }
      return data;
    },
  });

  return (
    <div className="bg-[#266bec]">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
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
              <ClipboardList className="h-5 w-5" />
            </Button>
            {isBWSUser && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/admin/users')}
                className="text-white hover:text-white hover:bg-white/20 border border-white"
                title="Admin"
              >
                <Settings className="h-5 w-5" />
              </Button>
            )}
          </div>
          <h1 className="text-2xl font-semibold text-white">Company Details</h1>
        </div>
      </div>
    </div>
  );
};