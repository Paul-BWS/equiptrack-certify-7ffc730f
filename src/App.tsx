import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Equipment from "./pages/Equipment";
import TorqueWrenches from "./pages/TorqueWrenches";
import CustomerDashboard from "./pages/CustomerDashboard";
import Settings from "./pages/Settings";
import AllEquipment from "./pages/AllEquipment";

const queryClient = new QueryClient();

function App() {
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
            <Route path="/customers/:customerId" element={<CustomerDashboard />} />
            <Route
              path="/customers/:customerId/equipment"
              element={<Equipment />}
            />
            <Route
              path="/customers/:customerId/equipment/torque-wrenches"
              element={<TorqueWrenches />}
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;