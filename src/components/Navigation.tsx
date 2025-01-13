import { Link } from "react-router-dom";
import { MobileNav } from "./navigation/MobileNav";
import { DesktopNav } from "./navigation/DesktopNav";
import { UserMenu } from "./navigation/UserMenu";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Building } from "lucide-react";
import { Button } from "./ui/button";

export const Navigation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { customerId } = useParams();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Check if we're on a customer-related route
  const isCustomerRoute = location.pathname.includes('/customers/');

  return (
    <nav className="border-b bg-[#266bec]">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          {isCustomerRoute && customerId && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent border-2 border-white hover:bg-white/10"
              onClick={() => navigate(`/customers/${customerId}`)}
            >
              <Building className="h-4 w-4 text-white" strokeWidth={2} />
            </Button>
          )}
          <Link to="/" className="text-xl font-semibold text-white">
            EquipService
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <DesktopNav />
          <MobileNav />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};