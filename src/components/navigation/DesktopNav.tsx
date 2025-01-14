import { Link } from "react-router-dom";
import { ClipboardList, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const DesktopNav = () => {
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
    <div className="hidden md:flex items-center gap-4">
      {isBWSUser && window.location.pathname === '/' && (
        <Link
          to="/admin/users"
          className="text-white hover:text-accent flex items-center gap-2"
        >
          <span>Admin</span>
        </Link>
      )}
      <div className="flex items-center gap-4">
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
      </div>
    </div>
  );
};