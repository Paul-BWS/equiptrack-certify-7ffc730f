import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import Index from "./pages/Index";
import Equipment from "./pages/Equipment";
import TorqueWrenches from "./pages/TorqueWrenches";
import TyreGauges from "./pages/TyreGauges";
import CustomerDashboard from "./pages/CustomerDashboard";
import Settings from "./pages/Settings";
import AllEquipment from "./pages/AllEquipment";

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Auth check error:", error);
        toast.error("Authentication error. Please sign in.");
        setIsAuthenticated(false);
        return;
      }
      
      if (!session) {
        console.log("No active session found");
        setIsAuthenticated(false);
        return;
      }
      
      console.log("Active session found:", session.user.id);
      setIsAuthenticated(true);
      toast.success("Successfully authenticated");
    };

    checkAuth();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Index />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/settings"
              element={
                isAuthenticated ? (
                  <Settings />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/all-equipment"
              element={
                isAuthenticated ? (
                  <AllEquipment />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/customers/:customerId"
              element={
                isAuthenticated ? (
                  <CustomerDashboard />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/customers/:customerId/equipment"
              element={
                isAuthenticated ? (
                  <Equipment />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/customers/:customerId/equipment/torque-wrenches"
              element={
                isAuthenticated ? (
                  <TorqueWrenches />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/customers/:customerId/equipment/tyre-gauges"
              element={
                isAuthenticated ? (
                  <TyreGauges />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;