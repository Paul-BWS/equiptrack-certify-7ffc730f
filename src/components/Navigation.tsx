import { Link, useLocation, useNavigate } from "react-router-dom";
import { ClipboardList, Settings, LayoutDashboard, Menu, Users, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Successfully signed out");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    }
  };

  // Function to get the current section name
  const getCurrentSection = () => {
    if (path.includes('torque-wrenches')) return 'Torque Wrenches';
    if (path.includes('tyre-gauges')) return 'Tyre Gauge';
    if (path.includes('equipment')) return 'Equipment';
    if (path.includes('settings')) return 'Settings';
    if (path.includes('profile')) return 'Profile';
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
          
          <div className="flex items-center gap-4">
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

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">User</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      user@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile burger menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:text-accent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
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
            <Button
              variant="ghost"
              className="text-white hover:text-accent flex items-center gap-2 justify-start p-0"
              onClick={handleSignOut}
            >
              <LogOut size={20} />
              <span>Log out</span>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};