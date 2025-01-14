import { Link } from "react-router-dom";
import { ClipboardList, Users, Settings } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useLocation } from "react-router-dom";

export const DesktopNav = () => {
  const location = useLocation();
  const isCustomerList = location.pathname === '/';

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
    <div className="hidden md:flex items-center gap-4 ml-auto">
      <Link
        to="/"
        className="text-white hover:text-accent flex items-center gap-2"
      >
        <Users size={20} />
        <span>Companies</span>
      </Link>
      <Link
        to="/all-equipment"
        className="text-white hover:text-accent flex items-center gap-2"
      >
        <ClipboardList size={20} />
        <span>Equipment</span>
      </Link>
      {isBWSUser && isCustomerList && (
        <Link
          to="/admin/users"
          className="text-white hover:text-accent flex items-center gap-2"
        >
          <Settings size={20} />
          <span>Admin</span>
        </Link>
      )}
    </div>
  );
};