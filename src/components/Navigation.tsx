import { Link } from "react-router-dom";
import { MobileNav } from "./navigation/MobileNav";
import { DesktopNav } from "./navigation/DesktopNav";
import { UserMenu } from "./navigation/UserMenu";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase";

export const Navigation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { customerId } = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        console.log('User signed out, forcing navigation to root');
        window.location.href = '/';
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
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
        window.location.href = '/';
      }
    } catch (err) {
      console.error("Error during sign out:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred while signing out",
        variant: "destructive",
      });
    }
  };

  if (!isMounted) {
    return null;
  }

  const isCustomerRoute = location.pathname.includes('/customers/') && customerId && customerId !== 'undefined';

  return (
    <nav className="border-b bg-[#266bec]">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          {isCustomerRoute && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent border border-white hover:bg-white/10"
              onClick={() => navigate(`/customers/${customerId}`)}
            >
              <ArrowLeft className="h-4 w-4 text-white" strokeWidth={2} />
            </Button>
          )}
          <Link to="/" className="text-xl font-semibold text-white">
            EquipTrack
          </Link>
        </div>
        <div className="flex-1 flex justify-end items-center space-x-4">
          <DesktopNav />
          <MobileNav 
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            onSignOut={handleSignOut}
          />
          <UserMenu onSignOut={handleSignOut} />
        </div>
      </div>
    </nav>
  );
};