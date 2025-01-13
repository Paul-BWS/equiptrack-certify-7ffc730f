import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import Index from "./pages/Index";
import Equipment from "./pages/Equipment";
import TorqueWrenches from "./pages/TorqueWrenches";
import TyreGauges from "./pages/TyreGauges";
import CustomerDashboard from "./pages/CustomerDashboard";
import Settings from "./pages/Settings";
import AllEquipment from "./pages/AllEquipment";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Auth check error:", error);
          toast.error("Authentication error occurred");
          return;
        }
        
        if (!session) {
          console.log("No active session found");
          return;
        }
        
        console.log("Active session found:", session.user.id);
      } catch (err) {
        console.error("Unexpected error during auth check:", err);
        toast.error("An unexpected error occurred");
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event);
      
      if (event === 'TOKEN_REFRESHED') {
        console.log("Token refreshed successfully");
      }
      
      if (event === 'SIGNED_OUT') {
        toast.info("You have been signed out");
        window.location.href = '/';
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/all-equipment" element={<AllEquipment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/customers/:customerId" element={<CustomerDashboard />} />
            <Route
              path="/customers/:customerId/equipment"
              element={<Equipment />}
            />
            <Route
              path="/customers/:customerId/equipment/torque-wrenches"
              element={<TorqueWrenches />}
            />
            <Route
              path="/customers/:customerId/equipment/tyre-gauges"
              element={<TyreGauges />}
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;