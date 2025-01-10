import { Link } from "react-router-dom";
import { ClipboardList, Settings, LayoutDashboard } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-bold">
          EquipService
        </Link>
        <div className="flex gap-4">
          <Link
            to="/"
            className="text-white hover:text-accent flex items-center gap-2"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/equipment"
            className="text-white hover:text-accent flex items-center gap-2"
          >
            <ClipboardList size={20} />
            <span>Equipment</span>
          </Link>
          <Link
            to="/settings"
            className="text-white hover:text-accent flex items-center gap-2"
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};