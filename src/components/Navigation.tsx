import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { DesktopNav } from "./navigation/DesktopNav";
import { MobileNav } from "./navigation/MobileNav";
import { UserMenu } from "./navigation/UserMenu";

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
            <a href="/" className="text-white text-xl font-bold">
              EquipService
            </a>
            <span className="text-white/80">|</span>
            <span className="text-white">{getCurrentSection()}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <DesktopNav />
            <UserMenu onSignOut={handleSignOut} />

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

        <MobileNav 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)}
          onSignOut={handleSignOut}
        />
      </div>
    </nav>
  );
};