import { Link } from "react-router-dom";
import { ClipboardList, LayoutDashboard, Users } from "lucide-react";

export const DesktopNav = () => {
  return (
    <div className="hidden md:flex gap-4">
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
  );
};