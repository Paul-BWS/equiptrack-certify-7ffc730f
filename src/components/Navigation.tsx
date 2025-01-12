import { Link, useLocation } from "react-router-dom";
import { ClipboardList, Settings, LayoutDashboard, Menu, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  // Function to get the current section name
  const getCurrentSection = () => {
    if (path.includes('torque-wrenches')) return 'Torque Wrenches';
    if (path.includes('tyre-gauges')) return 'Tyre Gauge';
    if (path.includes('equipment')) return 'Equipment';
    if (path.includes('settings')) return 'Settings';
    return 'Dashboard';
  };

  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-white text-xl font-bold">
              EquipService
            </Link>
            <span className="text-white/80">|</span>
            <span className="text-white">{getCurrentSection()}</span>
          </div>
          
          {/* Mobile burger menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:text-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Desktop navigation */}
          <div className="hidden md:flex gap-4">
            <Link
              to="/"
              className="text-white hover:text-accent flex items-center gap-2"
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/"
              className="text-white hover:text-accent flex items-center gap-2"
            >
              <Users size={20} />
              <span>Customers</span>
            </Link>
            <Link
              to="/all-equipment"
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

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-white hover:text-accent flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/"
              className="text-white hover:text-accent flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users size={20} />
              <span>Customers</span>
            </Link>
            <Link
              to="/all-equipment"
              className="text-white hover:text-accent flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <ClipboardList size={20} />
              <span>Equipment</span>
            </Link>
            <Link
              to="/settings"
              className="text-white hover:text-accent flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};