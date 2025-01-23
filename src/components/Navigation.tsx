import { Link } from "react-router-dom";
import { MobileNav } from "./navigation/MobileNav";
import { DesktopNav } from "./navigation/DesktopNav";
import { UserMenu } from "./navigation/UserMenu";
import { NavigationTitle } from "./navigation/NavigationTitle";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Users, ClipboardList } from "lucide-react";
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
        // Check if it's a session not found error
        if (error.message.includes('session_not_found')) {
          console.log('Session already expired, redirecting to login');
          toast({
            title: "Session expired",
            description: "Your session has expired. Please sign in again.",
          });
          window.location.href = '/';
          return;
        }
        
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
      // Force redirect to login page even if there's an error
      window.location.href = '/';
    }
  };

  if (!isMounted) {
    return null;
  }

  const isCustomerRoute = location.pathname.includes('/customers/') && customerId && customerId !== 'undefined';

  const handleBackClick = () => {
    if (location.pathname.includes('/equipment')) {
      navigate(`/customers/${customerId}`);
    } else {
      navigate(-1);
    }
  };

  return (
    <nav className="border-b bg-[#4c6fbf]">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          {isCustomerRoute && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent border border-white hover:bg-white/10"
              onClick={handleBackClick}
            >
              <ArrowLeft className="h-4 w-4 text-white" strokeWidth={2} />
            </Button>
          )}
          <NavigationTitle />
        </div>
        <div className="flex-1 flex justify-end items-center space-x-4">
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