import { Link } from "react-router-dom";
import { MobileNav } from "./navigation/MobileNav";
import { DesktopNav } from "./navigation/DesktopNav";
import { UserMenu } from "./navigation/UserMenu";
import { NavigationTitle } from "./navigation/NavigationTitle";
import { NavigationLinks } from "./navigation/NavigationLinks";
import { BackButton } from "./navigation/BackButton";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useSignOut } from "@/hooks/useSignOut";

export const Navigation = () => {
  const location = useLocation();
  const { customerId } = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleSignOut = useSignOut();

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

  if (!isMounted) {
    return null;
  }

  const isCustomerRoute = location.pathname.includes('/customers/') && customerId && customerId !== 'undefined';

  return (
    <nav className="border-b bg-[#4c6fbf]">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          {isCustomerRoute && <BackButton customerId={customerId} />}
          <NavigationTitle />
        </div>
        <div className="flex-1 flex justify-end items-center space-x-4">
          <NavigationLinks />
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