import { Link } from "react-router-dom";
import { DesktopNav } from "./navigation/DesktopNav";
import { MobileNav } from "./navigation/MobileNav";
import { UserMenu } from "./navigation/UserMenu";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
      navigate('/');
    }
  };

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link to="/" className="font-semibold">
          EquipService
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <DesktopNav />
          <MobileNav />
          <UserMenu onSignOut={handleSignOut} />
        </div>
      </div>
    </nav>
  );
};