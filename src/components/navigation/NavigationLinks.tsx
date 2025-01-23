import { Link } from "react-router-dom";
import { Users, ClipboardList } from "lucide-react";

export const NavigationLinks = () => {
  return (
    <div className="hidden md:flex items-center space-x-4">
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